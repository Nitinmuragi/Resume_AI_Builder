const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const auth = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/atsController');

// Stricter rate limit on the ATS check endpoint (NLP is CPU-heavier)
const atsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: 'Too many ATS check requests. Please wait a moment and try again.' },
});

router.post('/check', auth, atsLimiter, ctrl.runAtsCheck);
router.get('/history/:resume_id', auth, ctrl.getHistory);

module.exports = router;
