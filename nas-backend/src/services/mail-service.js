require('dotenv').config();
const nodemailer = require('nodemailer');

const SENDER_NAME = 'Rakesh Saunr';
const FROM_EMAIL = process.env.FROM_EMAIL || `"${SENDER_NAME}" <${process.env.EMAIL_USER}>`;

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const welcomeEmailTemplate = require('../emails/welcome-email');
const emailVerificationTemplate = require('../emails/email-verification');
const orderConfirmationTemplate = require('../emails/order-confirmation');

async function sendEmail({ to, subject, html }) {
  const mailOptions = {
    from: FROM_EMAIL,
    to,
    subject,
    html
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    if (info.accepted && info.accepted.length > 0) {
      console.log(`✅ Email sent to ${to}`);
    } else {
      console.error('❌ Email send failed:', info.response || 'Unknown error');
    }
  } catch (err) {
    console.error('❌ Error sending email:', err.message || err);
  }
}

async function sendWelcomeMail(firstName, emailId) {
  await sendEmail({
    to: emailId,
    subject: 'Welcome!',
    html: welcomeEmailTemplate(firstName),
  });
}

async function sendVerificationEmail(email, otp) {
  await sendEmail({
    to: email,
    subject: `Verification Email from ${SENDER_NAME}`,
    html: emailVerificationTemplate(otp),
  });
}

async function sendOrderConfirmationMail(email) {
  await sendEmail({
    to: email,
    subject: `Order Confirmation - ${SENDER_NAME}`,
    html: orderConfirmationTemplate(),
  });
}

module.exports = {
  sendWelcomeMail,
  sendVerificationEmail,
  sendOrderConfirmationMail,
};
