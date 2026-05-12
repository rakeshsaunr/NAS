module.exports = function forgotPasswordEmail({ email, otp }) {
  return {
    to: email,
    subject: 'Forgot Password OTP',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2>Password Reset OTP</h2>
        <p>Hello,</p>
        <p>You requested a password reset for your account. Use the following OTP to proceed:</p>
        <div style="font-size:2em;font-weight:bold;margin:20px 0;text-align:center;">${otp}</div>
        <p>If you did not request a reset, please ignore this email.</p>
        <p>Thanks,<br/>Portfolio Team</p>
      </div>
    `,
  };
};
