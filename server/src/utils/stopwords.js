/**
 * English stopwords list for NLP preprocessing
 */
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'shall', 'can', 'need', 'dare', 'ought', 'used', 'that', 'this', 'these',
  'those', 'it', 'its', 'they', 'them', 'their', 'we', 'our', 'you', 'your',
  'he', 'she', 'his', 'her', 'i', 'me', 'my', 'not', 'no', 'nor', 'so',
  'yet', 'both', 'either', 'neither', 'as', 'if', 'than', 'then', 'just',
  'because', 'while', 'when', 'where', 'which', 'who', 'whom', 'how',
  'all', 'each', 'every', 'few', 'more', 'most', 'other', 'some', 'such',
  'also', 'well', 'must', 'new', 'good', 'able', 'per', 'within', 'across',
  'strong', 'including', 'experience', 'skills', 'work', 'knowledge',
  'ability', 'understanding', 'proven', 'excellent', 'required', 'preferred',
]);

module.exports = STOPWORDS;
