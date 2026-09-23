const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/resumeController');

router.get('/', auth, ctrl.listResumes);
router.post('/', auth, ctrl.createResume);
router.get('/:id', auth, ctrl.getResume);
router.put('/:id', auth, ctrl.updateResume);
router.delete('/:id', auth, ctrl.deleteResume);
router.post('/:id/duplicate', auth, ctrl.duplicateResume);
router.get('/:id/export-pdf', auth, ctrl.exportPDF);

module.exports = router;
