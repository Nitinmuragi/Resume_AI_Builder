const { ResumeTemplate } = require('../models');

// GET /api/templates
exports.listTemplates = async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    const templates = await ResumeTemplate.findAll({ where });
    res.json(templates);
  } catch (err) {
    next(err);
  }
};

// GET /api/templates/:id
exports.getTemplate = async (req, res, next) => {
  try {
    const template = await ResumeTemplate.findByPk(req.params.id);
    if (!template) return res.status(404).json({ error: 'Template not found.' });
    res.json(template);
  } catch (err) {
    next(err);
  }
};
