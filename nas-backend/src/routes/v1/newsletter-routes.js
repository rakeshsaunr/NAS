const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// Social Media Links
const SOCIALS = [
  { name: "Facebook", icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", url: "https://www.facebook.com/networkautomationindore/" },
  { name: "Instagram", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg", url: "https://www.instagram.com/networkautomations/" },
  { name: "WhatsApp", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", url: "https://wa.me/919522595887" },
  { name: "LinkedIn", icon: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", url: "https://www.linkedin.com/company/network-automation-solution/" },
  // Add more if needed
];

// Subscribe to Newsletter
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email presence and format
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Basic email format regex
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Company constants for footer
    const COMPANY_NAME = "Network Automation Solutions";
    const COMPANY_PHONE = "+91 9522595887, 98260 50302";
    const COMPANY_EMAIL = "info@networkautomations.in";
    const COMPANY_WEBSITE = "https://www.networkautomation.in/";
    const COMPANY_LOGO = "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779187409/logo_zbpngt.jpg";
    const YEAR = new Date().getFullYear();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter
    await transporter.verify();

    // Socials HTML (inline for email)
    const socialsHtml = `
      <div style="margin: 18px 0 0 0; text-align: center;">
        <span style="font-family: Arial,sans-serif; color:#f4f4f4; font-size:15px; font-weight: 500; display:block; margin-bottom:6px;">Follow us on</span>
        <div style="display:inline-block;">
          ${SOCIALS.map(s =>
            `<a href="${s.url}" target="_blank" style="display:inline-block; margin:0 7px; text-decoration:none;">
              <img src="${s.icon}" alt="${s.name}" width="28" height="28" style="vertical-align:middle; border-radius:8px; background:white; padding:3px;"/>
            </a>`
          ).join("")}
        </div>
      </div>
    `;

    // Modern Responsive Newsletter Template (inline CSS, Gmail compatible)
    const html = `
  <div style="background-color:#f4f4f4;padding:30px 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#f4f4f4;">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="94%" style="max-width:540px; margin:0 auto; background:#fff; border-radius:20px; box-shadow:0 4px 24px rgba(17,24,39,0.10), 0 1.5px 3px rgba(17,24,39,0.07); overflow:hidden;">
            <!-- Logo -->
            <tr>
              <td align="center" style="padding: 32px 24px 0 24px;">
                <img src="${COMPANY_LOGO}" alt="Company Logo" width="150" style="display:block; margin:auto; border-radius:12px;max-width:150px;">
              </td>
            </tr>
            <!-- Header Section -->
            <tr>
              <td align="center" style="padding: 0 24px 0 24px;">
                <h1 style="font-family: Arial,sans-serif; font-size:28px; font-weight:700; color:#111827; margin:32px 0 12px 0; letter-spacing:-0.5px;">
                  Welcome to <span style="color:#ef4444;">${COMPANY_NAME}</span>
                </h1>
                <h2 style="font-family: Arial,sans-serif; font-size:22px; font-weight:600; margin:0 0 18px 0; color:#ef4444;">
                  Thank You For Subscribing ❤️
                </h2>
                <p style="font-family:Arial,sans-serif;font-size:17px;color:#111827;margin:0 0 20px 0;line-height:1.65;">
                  We're excited to have you on board! You will now receive exclusive updates and insights from experts in:
                </p>
              </td>
            </tr>
            <!-- Services Section -->
            <tr>
              <td align="center" style="padding: 0 24px 0 24px;">
                <ul style="font-family:Arial,sans-serif;font-size:16px;color:#111827;text-align:left;list-style:none; margin:0 0 24px 0; padding:0;">
                  <li style="margin-bottom:7px;display:flex;align-items:center;"><span style="font-size:18px;color:#ef4444;font-weight:bold;margin-right:11px;">&#9679;</span> CCTV Solutions</li>
                  <li style="margin-bottom:7px;display:flex;align-items:center;"><span style="font-size:18px;color:#ef4444;font-weight:bold;margin-right:11px;">&#9679;</span> Networking Services</li>
                  <li style="margin-bottom:7px;display:flex;align-items:center;"><span style="font-size:18px;color:#ef4444;font-weight:bold;margin-right:11px;">&#9679;</span> Smart Security</li>
                  <li style="margin-bottom:0;display:flex;align-items:center;"><span style="font-size:18px;color:#ef4444;font-weight:bold;margin-right:11px;">&#9679;</span> Home Automation</li>
                </ul>
              </td>
            </tr>
            <!-- What You'll Get -->
            <tr>
              <td style="padding: 0 24px 0 24px;">
                <div style="background:#f4f4f4;border-radius:14px;padding:22px 18px 14px 18px;margin:0 0 22px 0;box-shadow:0 2px 10px rgba(17,24,39,0.06);">
                  <h3 style="font-family:Arial,sans-serif;font-size:17px;font-weight:600;color:#111827;margin:0 0 12px 0;">
                    What to Expect:
                  </h3>
                  <ul style="font-family:Arial,sans-serif;font-size:15.5px;color:#111827;line-height:1.7;list-style-type:disc;margin:0 0 0 20px;padding:0;">
                    <li style="margin-bottom:5px;">Latest updates</li>
                    <li style="margin-bottom:5px;">Security tips</li>
                    <li style="margin-bottom:5px;">Special offers</li>
                    <li>Technical support</li>
                  </ul>
                </div>
              </td>
            </tr>
            <!-- CTA Button -->
            <tr>
              <td align="center">
                <a href="${COMPANY_WEBSITE}" target="_blank" style="display:inline-block; background-color:#ef4444; color:#fff; font-family:Arial,sans-serif; font-size:18px; font-weight:600; padding:14px 40px; border-radius:32px; box-shadow:0 2px 8px rgba(239,68,68,0.16); text-decoration:none; margin:0 0 26px 0;">
                  Visit Our Website
                </a>
              </td>
            </tr>
            <!-- Footer Section -->
            <tr>
              <td style="padding:28px 18px 20px 18px;background:#111827;border-bottom-left-radius:20px;border-bottom-right-radius:20px;">
                <div style="font-family:Arial,sans-serif; color:#f4f4f4; font-size:14.5px; margin-bottom:7px;">
                  <strong>${COMPANY_NAME}</strong>
                </div>
                <div style="font-family:Arial,sans-serif; color:#f4f4f4; font-size:14px;">
                  <span style="margin-right:16px;">📞 ${COMPANY_PHONE}</span>
                  <span style="margin-right:16px;">✉️ ${COMPANY_EMAIL}</span>
                  <span>🌐 <a href="${COMPANY_WEBSITE}" style="color:#ef4444;text-decoration:none;">networkautomations.com</a></span>
                </div>
                <div style="font-family:Arial,sans-serif; color:#bfbfbf; font-size:13.3px; margin-top:10px;">
                  &copy; ${YEAR} ${COMPANY_NAME}. All Rights Reserved.
                </div>
                ${socialsHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
    `;

    // Send welcome email
    await transporter.sendMail({
      from: `"${COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome To Our Newsletter 🚀",
      html,
    });

    return res.status(200).json({
      success: true,
      message: "Subscription successful. Email sent!",
    });

  } catch (error) {
    console.error("NEWSLETTER ERROR =>", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to subscribe to newsletter",
    });
  }
});

module.exports = router;