const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: parseInt(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a password reset email to the specified recipient.
 * @param {string} toEmail 
 * @param {string} resetLink 
 */
async function sendPasswordResetEmail(toEmail, resetLink) {
  const mailOptions = {
    from: `"ResumeAI Support" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Password Reset Request - ResumeAI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #2563eb; margin: 0;">ResumeAI</h2>
          <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Smart ATS Resume Builder</p>
        </div>
        <div style="color: #334155; line-height: 1.6;">
          <p>Hello,</p>
          <p>We received a request to reset your password for your <strong>ResumeAI</strong> account.</p>
          <p>Click the button below to set a new password. This link is valid for <strong>1 hour</strong>.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #2563eb; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 13px; color: #64748b;">
            If the button doesn't work, copy and paste this link into your browser:
            <br />
            <a href="${resetLink}" style="color: #2563eb; word-break: break-all;">${resetLink}</a>
          </p>
          <p style="font-size: 13px; color: #94a3b8; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
            If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Password reset email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send password reset email:', error.message);
    return false;
  }
}

module.exports = {
  sendPasswordResetEmail,
};
