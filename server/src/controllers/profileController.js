const {
  Profile, UserSkill, Skill, UserLanguage, Language,
  Education, Experience, Project, Certification, User,
} = require('../models');
const { uploadToCloudinary } = require('../services/uploadService');

// GET /api/profile
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'full_name', 'email', 'mobile_no'],
      include: [
        { model: Profile, as: 'profile' },
        {
          model: UserSkill, as: 'userSkills',
          include: [{ model: Skill, as: 'skill' }],
        },
        {
          model: UserLanguage, as: 'userLanguages',
          include: [{ model: Language, as: 'language' }],
        },
        { model: Education, as: 'education' },
        { model: Experience, as: 'experience' },
        { model: Project, as: 'projects' },
        { model: Certification, as: 'certifications' },
      ],
    });

    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PUT /api/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { photo_url, address, dob, linkedin_url, github_url, portfolio_url, summary, full_name } = req.body;

    // Update user name if provided
    if (full_name) {
      await User.update({ full_name }, { where: { id: userId } });
    }

    let profile = await Profile.findOne({ where: { user_id: userId } });
    if (!profile) {
      profile = await Profile.create({ user_id: userId });
    }

    await profile.update({
      ...(address !== undefined && { address }),
      ...(dob !== undefined && { dob }),
      ...(linkedin_url !== undefined && { linkedin_url }),
      ...(github_url !== undefined && { github_url }),
      ...(portfolio_url !== undefined && { portfolio_url }),
      ...(summary !== undefined && { summary }),
      ...(photo_url !== undefined && { photo_url }),
    });

    res.json({ message: 'Profile updated.', profile });
  } catch (err) {
    next(err);
  }
};

// POST /api/profile/photo
exports.uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

    const photoUrl = await uploadToCloudinary(req.file.buffer);
    const profile = await Profile.findOne({ where: { user_id: req.user.id } });
    if (profile) await profile.update({ photo_url: photoUrl });

    res.json({ photo_url: photoUrl });
  } catch (err) {
    next(err);
  }
};

// POST /api/profile/skills
exports.addSkill = async (req, res, next) => {
  try {
    const { skillName, proficiency } = req.body;
    if (!skillName) return res.status(400).json({ error: 'skillName is required.' });

    // Find or create skill in master
    const [skill] = await Skill.findOrCreate({
      where: { skill_name: skillName.trim() },
      defaults: { is_custom: true },
    });

    // Check if user already has this skill
    const existing = await UserSkill.findOne({ where: { user_id: req.user.id, skill_id: skill.id } });
    if (existing) return res.status(409).json({ error: 'Skill already added.' });

    const userSkill = await UserSkill.create({
      user_id: req.user.id,
      skill_id: skill.id,
      proficiency: proficiency || 'Basic',
    });

    res.status(201).json({ ...userSkill.toJSON(), skill });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/profile/skills/:id
exports.deleteSkill = async (req, res, next) => {
  try {
    const deleted = await UserSkill.destroy({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!deleted) return res.status(404).json({ error: 'Skill not found.' });
    res.json({ message: 'Skill removed.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/profile/languages
exports.addLanguage = async (req, res, next) => {
  try {
    const { languageName, proficiency } = req.body;
    if (!languageName) return res.status(400).json({ error: 'languageName is required.' });

    const [language] = await Language.findOrCreate({
      where: { language_name: languageName.trim() },
    });

    const existing = await UserLanguage.findOne({ where: { user_id: req.user.id, language_id: language.id } });
    if (existing) return res.status(409).json({ error: 'Language already added.' });

    const userLang = await UserLanguage.create({
      user_id: req.user.id,
      language_id: language.id,
      proficiency: proficiency || 'Basic',
    });

    res.status(201).json({ ...userLang.toJSON(), language });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/profile/languages/:id
exports.deleteLanguage = async (req, res, next) => {
  try {
    const deleted = await UserLanguage.destroy({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!deleted) return res.status(404).json({ error: 'Language not found.' });
    res.json({ message: 'Language removed.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/profile/education
exports.addEducation = async (req, res, next) => {
  try {
    const { degree, institution, start_year, end_year, grade } = req.body;
    const edu = await Education.create({ user_id: req.user.id, degree, institution, start_year, end_year, grade });
    res.status(201).json(edu);
  } catch (err) {
    next(err);
  }
};

// PUT /api/profile/education/:id
exports.updateEducation = async (req, res, next) => {
  try {
    const [updated] = await Education.update(req.body, {
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!updated) return res.status(404).json({ error: 'Education entry not found.' });
    res.json({ message: 'Education updated.' });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/profile/education/:id
exports.deleteEducation = async (req, res, next) => {
  try {
    const deleted = await Education.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    if (!deleted) return res.status(404).json({ error: 'Education entry not found.' });
    res.json({ message: 'Education removed.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/profile/experience
exports.addExperience = async (req, res, next) => {
  try {
    const exp = await Experience.create({ user_id: req.user.id, ...req.body });
    res.status(201).json(exp);
  } catch (err) {
    next(err);
  }
};

// PUT /api/profile/experience/:id
exports.updateExperience = async (req, res, next) => {
  try {
    const [updated] = await Experience.update(req.body, {
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!updated) return res.status(404).json({ error: 'Experience entry not found.' });
    res.json({ message: 'Experience updated.' });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/profile/experience/:id
exports.deleteExperience = async (req, res, next) => {
  try {
    const deleted = await Experience.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    if (!deleted) return res.status(404).json({ error: 'Experience entry not found.' });
    res.json({ message: 'Experience removed.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/profile/projects
exports.addProject = async (req, res, next) => {
  try {
    const project = await Project.create({ user_id: req.user.id, ...req.body });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

// PUT /api/profile/projects/:id
exports.updateProject = async (req, res, next) => {
  try {
    const [updated] = await Project.update(req.body, {
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!updated) return res.status(404).json({ error: 'Project not found.' });
    res.json({ message: 'Project updated.' });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/profile/projects/:id
exports.deleteProject = async (req, res, next) => {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    if (!deleted) return res.status(404).json({ error: 'Project not found.' });
    res.json({ message: 'Project removed.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/profile/certifications
exports.addCertification = async (req, res, next) => {
  try {
    const cert = await Certification.create({ user_id: req.user.id, ...req.body });
    res.status(201).json(cert);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/profile/certifications/:id
exports.deleteCertification = async (req, res, next) => {
  try {
    const deleted = await Certification.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    if (!deleted) return res.status(404).json({ error: 'Certification not found.' });
    res.json({ message: 'Certification removed.' });
  } catch (err) {
    next(err);
  }
};

// GET /api/profile/skills/master — return all skills for autocomplete
exports.getSkillsMaster = async (req, res, next) => {
  try {
    const { q } = req.query;
    const where = {};
    if (q) {
      const { Op } = require('sequelize');
      where.skill_name = { [Op.like]: `%${q}%` };
    }
    const skills = await Skill.findAll({ where, limit: 50 });
    res.json(skills);
  } catch (err) {
    next(err);
  }
};

// GET /api/profile/languages/master
exports.getLanguagesMaster = async (req, res, next) => {
  try {
    const languages = await Language.findAll();
    res.json(languages);
  } catch (err) {
    next(err);
  }
};
