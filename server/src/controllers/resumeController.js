const { Resume, ResumeTemplate } = require('../models');
const { generatePDF } = require('../services/pdfService');

const MAX_RESUMES = parseInt(process.env.MAX_RESUMES_PER_USER) || 12;

// GET /api/resumes
exports.listResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.findAll({
      where: { user_id: req.user.id },
      include: [{ model: ResumeTemplate, as: 'template', attributes: ['id', 'template_name', 'category', 'thumbnail_color'] }],
      order: [['updated_at', 'DESC']],
    });
    res.json(resumes);
  } catch (err) {
    next(err);
  }
};

// POST /api/resumes
exports.createResume = async (req, res, next) => {
  try {
    const count = await Resume.count({ where: { user_id: req.user.id } });
    if (count >= MAX_RESUMES) {
      return res.status(400).json({ error: `You can have at most ${MAX_RESUMES} resumes.` });
    }

    const { template_id, title, target_role, resume_data } = req.body;
    if (!template_id) return res.status(400).json({ error: 'template_id is required.' });

    const resume = await Resume.create({
      user_id: req.user.id,
      template_id,
      title: title || 'My Resume',
      target_role: target_role || '',
      resume_data: resume_data || {},
    });

    res.status(201).json(resume);
  } catch (err) {
    next(err);
  }
};

// GET /api/resumes/:id
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [{ model: ResumeTemplate, as: 'template' }],
    });
    if (!resume) return res.status(404).json({ error: 'Resume not found.' });
    res.json(resume);
  } catch (err) {
    next(err);
  }
};

// PUT /api/resumes/:id
exports.updateResume = async (req, res, next) => {
  try {
    const { title, target_role, resume_data, template_id } = req.body;
    const [updated] = await Resume.update(
      {
        ...(title !== undefined && { title }),
        ...(target_role !== undefined && { target_role }),
        ...(resume_data !== undefined && { resume_data }),
        ...(template_id !== undefined && { template_id }),
      },
      { where: { id: req.params.id, user_id: req.user.id } }
    );
    if (!updated) return res.status(404).json({ error: 'Resume not found.' });
    const resume = await Resume.findByPk(req.params.id);
    res.json(resume);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/resumes/:id
exports.deleteResume = async (req, res, next) => {
  try {
    const deleted = await Resume.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    if (!deleted) return res.status(404).json({ error: 'Resume not found.' });
    res.json({ message: 'Resume deleted.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/resumes/:id/duplicate
exports.duplicateResume = async (req, res, next) => {
  try {
    const count = await Resume.count({ where: { user_id: req.user.id } });
    if (count >= MAX_RESUMES) {
      return res.status(400).json({ error: `You can have at most ${MAX_RESUMES} resumes.` });
    }

    const original = await Resume.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!original) return res.status(404).json({ error: 'Resume not found.' });

    const duplicate = await Resume.create({
      user_id: req.user.id,
      template_id: original.template_id,
      parent_resume_id: original.id,
      title: `${original.title} (Copy)`,
      target_role: original.target_role,
      resume_data: original.resume_data,
    });

    res.status(201).json(duplicate);
  } catch (err) {
    next(err);
  }
};

// GET /api/resumes/:id/export-pdf
exports.exportPDF = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [{ model: ResumeTemplate, as: 'template' }],
    });
    if (!resume) return res.status(404).json({ error: 'Resume not found.' });

    const pdfBuffer = await generatePDF(resume.resume_data, resume.template);

    const fileName = `${resume.title || 'resume'}-${Date.now()}.pdf`;
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};
