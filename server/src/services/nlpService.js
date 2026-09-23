const natural = require('natural');
const STOPWORDS = require('../utils/stopwords');
const { Skill } = require('../models');

const tokenizer = new natural.WordTokenizer();

// ─── Preprocessing ─────────────────────────────────────────────────────────────

/**
 * Cleans and tokenizes text into an array of lowercase tokens
 * @param {string} text
 * @returns {string[]}
 */
function preprocess(text) {
  if (!text) return [];
  // Lowercase and remove punctuation (keep hyphens in compound words like "full-stack")
  const cleaned = text.toLowerCase().replace(/[^a-z0-9\s.#+\-]/g, ' ');
  const tokens = tokenizer.tokenize(cleaned) || [];
  return tokens.filter(t => t.length > 1 && !STOPWORDS.has(t));
}

/**
 * Extract bigrams (two-word phrases) from tokens for multi-word skill detection
 */
function extractBigrams(tokens) {
  const bigrams = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    bigrams.push(`${tokens[i]} ${tokens[i + 1]}`);
  }
  return bigrams;
}

// ─── TF-IDF Keyword Extraction ─────────────────────────────────────────────────

/**
 * Extracts top N keywords from text using TF-IDF
 * @param {string} text
 * @param {number} topN
 * @returns {string[]}
 */
function extractKeywordsTFIDF(text, topN = 40) {
  const tfidf = new natural.TfIdf();

  // Split text into sentences as mini-documents for TF-IDF
  const sentences = text.split(/[.\n!?]+/).filter(s => s.trim().length > 10);
  if (sentences.length === 0) sentences.push(text);

  sentences.forEach(sentence => tfidf.addDocument(preprocess(sentence).join(' ')));

  // Collect scores for each term across all docs
  const termScores = {};
  for (let i = 0; i < sentences.length; i++) {
    tfidf.listTerms(i).forEach(({ term, tfidf: score }) => {
      termScores[term] = Math.max(termScores[term] || 0, score);
    });
  }

  return Object.entries(termScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([term]) => term);
}

// ─── Levenshtein Fuzzy Match ───────────────────────────────────────────────────

/**
 * Returns true if two strings are within levenshtein distance threshold
 */
function fuzzyMatch(a, b, threshold = 2) {
  if (Math.abs(a.length - b.length) > threshold + 1) return false;
  return natural.LevenshteinDistance(a, b) <= threshold;
}

// ─── Skill Dictionary Cross-match ─────────────────────────────────────────────

/**
 * Finds known skill names from the skills_master table present in text tokens
 */
async function findKnownSkills(tokens, bigrams) {
  const allSkills = await Skill.findAll({ attributes: ['skill_name'] });
  const skillNames = allSkills.map(s => s.skill_name.toLowerCase());

  const found = new Set();
  const combined = [...tokens, ...bigrams];

  for (const skillName of skillNames) {
    for (const token of combined) {
      if (token === skillName || fuzzyMatch(token, skillName, 2)) {
        found.add(skillName);
        break;
      }
    }
  }

  return Array.from(found);
}

// ─── Resume Text Extractor ─────────────────────────────────────────────────────

/**
 * Extracts all searchable text from resume_data JSON
 */
function extractResumeText(resumeData) {
  if (!resumeData) return '';
  const parts = [];

  if (resumeData.summary) parts.push(resumeData.summary);

  if (Array.isArray(resumeData.skills)) {
    resumeData.skills.forEach(s => parts.push(s.name || s));
  }

  if (Array.isArray(resumeData.experience)) {
    resumeData.experience.forEach(e => {
      if (e.designation) parts.push(e.designation);
      if (e.description) parts.push(e.description);
    });
  }

  if (Array.isArray(resumeData.projects)) {
    resumeData.projects.forEach(p => {
      if (p.title) parts.push(p.title);
      if (p.description) parts.push(p.description);
      if (p.techUsed || p.tech_used) parts.push(p.techUsed || p.tech_used);
    });
  }

  if (Array.isArray(resumeData.education)) {
    resumeData.education.forEach(e => {
      if (e.degree) parts.push(e.degree);
    });
  }

  if (Array.isArray(resumeData.certifications)) {
    resumeData.certifications.forEach(c => {
      if (c.title) parts.push(c.title);
    });
  }

  return parts.join(' ');
}

// ─── Main Match Function ───────────────────────────────────────────────────────

/**
 * Main ATS matching function
 * @param {string} jdText - Raw job description text
 * @param {object} resumeData - Resume JSON data
 * @returns {{ match_score: number, matched_keywords: string[], missing_keywords: string[], suggestions: string[] }}
 */
async function matchResumeToJD(jdText, resumeData) {
  // 1. Extract JD keywords
  const jdTokens = preprocess(jdText);
  const jdBigrams = extractBigrams(jdTokens);
  const jdTFIDFKeywords = extractKeywordsTFIDF(jdText, 50);
  const jdKnownSkills = await findKnownSkills(jdTokens, jdBigrams);

  // Merge and deduplicate JD keywords
  const jdKeywordSet = new Set([...jdTFIDFKeywords, ...jdKnownSkills]);
  const jdKeywords = Array.from(jdKeywordSet);

  if (jdKeywords.length === 0) {
    return { match_score: 0, matched_keywords: [], missing_keywords: [], suggestions: [] };
  }

  // 2. Extract resume keywords
  const resumeText = extractResumeText(resumeData);
  const resumeTokens = preprocess(resumeText);
  const resumeBigrams = extractBigrams(resumeTokens);
  const resumeKnownSkills = await findKnownSkills(resumeTokens, resumeBigrams);
  const resumeKeywordSet = new Set([...resumeTokens, ...resumeBigrams, ...resumeKnownSkills]);

  // 3. Match JD keywords against resume keywords
  const matched = [];
  const missing = [];

  for (const jdKeyword of jdKeywords) {
    let found = false;

    // Exact match
    if (resumeKeywordSet.has(jdKeyword)) {
      found = true;
    }

    // Fuzzy match against resume tokens
    if (!found) {
      for (const resumeToken of resumeKeywordSet) {
        if (fuzzyMatch(jdKeyword, resumeToken, 2)) {
          found = true;
          break;
        }
      }
    }

    if (found) {
      matched.push(jdKeyword);
    } else {
      missing.push(jdKeyword);
    }
  }

  // 4. Calculate score
  const match_score = Math.round((matched.length / jdKeywords.length) * 100 * 100) / 100;

  // 5. Generate section-wise suggestions for missing keywords
  const suggestions = generateSuggestions(missing, resumeData);

  return {
    match_score,
    matched_keywords: matched,
    missing_keywords: missing,
    suggestions,
  };
}

/**
 * Generate friendly suggestions for where to add missing keywords
 */
function generateSuggestions(missingKeywords, resumeData) {
  const suggestions = [];
  const skillKeywords = missingKeywords.filter(k => k.length > 2);

  if (skillKeywords.length > 0) {
    suggestions.push(`Add these skills to your Skills section: ${skillKeywords.slice(0, 5).join(', ')}`);
  }

  const hasExperience = Array.isArray(resumeData?.experience) && resumeData.experience.length > 0;
  if (hasExperience && missingKeywords.length > 0) {
    suggestions.push(`Mention relevant keywords like "${missingKeywords[0]}" in your work experience descriptions.`);
  }

  if (!resumeData?.summary && missingKeywords.length > 0) {
    suggestions.push(`Add a professional summary mentioning key skills like: ${missingKeywords.slice(0, 3).join(', ')}.`);
  }

  return suggestions;
}

module.exports = { matchResumeToJD, preprocess, extractResumeText };
