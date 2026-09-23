const { Resume, JobDescription, AtsMatchResult } = require('../models');
const { matchResumeToJD } = require('../services/nlpService');

// POST /api/ats/check
exports.runAtsCheck = async (req, res, next) => {
  try {
    const { resume_id, jd_text, jd_title } = req.body;

    if (!resume_id || !jd_text) {
      return res.status(400).json({ error: 'resume_id and jd_text are required.' });
    }

    // Verify resume belongs to user
    const resume = await Resume.findOne({ where: { id: resume_id, user_id: req.user.id } });
    if (!resume) return res.status(404).json({ error: 'Resume not found.' });

    // Save JD
    const jd = await JobDescription.create({
      user_id: req.user.id,
      jd_title: jd_title || 'Untitled JD',
      jd_text,
    });

    // Run NLP matching
    const { match_score, matched_keywords, missing_keywords, suggestions } =
      await matchResumeToJD(jd_text, resume.resume_data);

    // Save result
    const result = await AtsMatchResult.create({
      resume_id: resume.id,
      jd_id: jd.id,
      match_score,
      matched_keywords,
      missing_keywords,
      suggestions,
    });

    // Update resume's last ATS score
    await resume.update({ last_ats_score: match_score });

    res.json({
      match_score,
      matched_keywords,
      missing_keywords,
      suggestions,
      result_id: result.id,
      jd_id: jd.id,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/ats/history/:resume_id
exports.getHistory = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ where: { id: req.params.resume_id, user_id: req.user.id } });
    if (!resume) return res.status(404).json({ error: 'Resume not found.' });

    const history = await AtsMatchResult.findAll({
      where: { resume_id: req.params.resume_id },
      include: [{ model: JobDescription, as: 'jobDescription', attributes: ['jd_title', 'created_at'] }],
      order: [['checked_at', 'DESC']],
    });

    res.json(history);
  } catch (err) {
    next(err);
  }
};
