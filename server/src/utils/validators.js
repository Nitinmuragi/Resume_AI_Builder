/**
 * Input validators for auth and profile endpoints
 */

const validateRegister = (body) => {
  const errors = [];
  const { fullName, email, mobile_no, password } = body;

  if (!fullName || fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters.');
  }
  if (!email && !mobile_no) {
    errors.push('Either email or mobile number is required.');
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format.');
  }
  if (mobile_no && !/^\+?[0-9]{10,15}$/.test(mobile_no)) {
    errors.push('Invalid mobile number format.');
  }
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters.');
  }

  return errors;
};

const validateLogin = (body) => {
  const errors = [];
  const { email, mobile_no, password } = body;

  if (!email && !mobile_no) {
    errors.push('Either email or mobile number is required.');
  }
  if (!password) {
    errors.push('Password is required.');
  }

  return errors;
};

module.exports = { validateRegister, validateLogin };
