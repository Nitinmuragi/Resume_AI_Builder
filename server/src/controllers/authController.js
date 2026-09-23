const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, Profile } = require('../models');
const { validateRegister, validateLogin } = require('../utils/validators');
const { sendPasswordResetEmail } = require('../services/emailService');

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { fullName, email, mobile_no, password } = req.body;

    const errors = validateRegister(req.body);
    if (errors.length > 0) return res.status(400).json({ error: errors.join(' ') });

    // Check duplicate
    const where = {};
    if (email) where.email = email;
    else where.mobile_no = mobile_no;

    const existing = await User.findOne({ where });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email/mobile already exists.' });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const user = await User.create({
      full_name: fullName,
      email: email || null,
      mobile_no: mobile_no || null,
      password_hash,
    });

    // Create empty profile
    await Profile.create({ user_id: user.id });

    const token = generateToken(user.id);

    res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: { id: user.id, full_name: user.full_name, email: user.email, mobile_no: user.mobile_no },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, mobile_no, password } = req.body;

    const errors = validateLogin(req.body);
    if (errors.length > 0) return res.status(400).json({ error: errors.join(' ') });

    const where = {};
    if (email) where.email = email;
    else where.mobile_no = mobile_no;

    const user = await User.findOne({ where });
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

    const token = generateToken(user.id);

    res.json({
      message: 'Login successful.',
      token,
      user: { id: user.id, full_name: user.full_name, email: user.email, mobile_no: user.mobile_no },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Don't reveal if email exists
      return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await user.update({ reset_token: token, reset_token_expiry: expiry });

    const clientUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';
    const resetLink = `${clientUrl.replace(/\/+$/, '')}/reset-password?token=${token}`;

    console.log(`\n🔑 Password Reset Link for ${email}:\n${resetLink}\n`);

    // Send email using configured SMTP
    await sendPasswordResetEmail(email, resetLink);

    res.json({ message: 'If an account with that email exists, a password reset link has been sent to your email.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/reset-password
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const user = await User.findOne({ where: { reset_token: token } });
    if (!user || !user.reset_token_expiry || new Date() > user.reset_token_expiry) {
      return res.status(400).json({ error: 'Invalid or expired reset token.' });
    }

    const password_hash = await bcrypt.hash(newPassword, 12);
    await user.update({ password_hash, reset_token: null, reset_token_expiry: null });

    res.json({ message: 'Password reset successfully. Please log in.' });
  } catch (err) {
    next(err);
  }
};
