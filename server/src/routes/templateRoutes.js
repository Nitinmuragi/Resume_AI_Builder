const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/templateController');

router.get('/', auth, ctrl.listTemplates);
router.get('/:id', auth, ctrl.getTemplate);

module.exports = router;
