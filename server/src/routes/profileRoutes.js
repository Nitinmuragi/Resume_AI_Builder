const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { upload } = require('../services/uploadService');
const ctrl = require('../controllers/profileController');

// Profile CRUD
router.get('/', auth, ctrl.getProfile);
router.put('/', auth, ctrl.updateProfile);
router.post('/photo', auth, upload.single('photo'), ctrl.uploadPhoto);

// Skills
router.get('/skills/master', auth, ctrl.getSkillsMaster);
router.post('/skills', auth, ctrl.addSkill);
router.delete('/skills/:id', auth, ctrl.deleteSkill);

// Languages
router.get('/languages/master', auth, ctrl.getLanguagesMaster);
router.post('/languages', auth, ctrl.addLanguage);
router.delete('/languages/:id', auth, ctrl.deleteLanguage);

// Education
router.post('/education', auth, ctrl.addEducation);
router.put('/education/:id', auth, ctrl.updateEducation);
router.delete('/education/:id', auth, ctrl.deleteEducation);

// Experience
router.post('/experience', auth, ctrl.addExperience);
router.put('/experience/:id', auth, ctrl.updateExperience);
router.delete('/experience/:id', auth, ctrl.deleteExperience);

// Projects
router.post('/projects', auth, ctrl.addProject);
router.put('/projects/:id', auth, ctrl.updateProject);
router.delete('/projects/:id', auth, ctrl.deleteProject);

// Certifications
router.post('/certifications', auth, ctrl.addCertification);
router.delete('/certifications/:id', auth, ctrl.deleteCertification);

module.exports = router;
