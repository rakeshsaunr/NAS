function generateEmailTemplate(otp) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navdana OTP Verification</title>
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #FCF4E7; color: #232321; margin: 0; padding: 0;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td style="padding: 24px; text-align: center;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: auto;">
                    <tr>
                        <td style="background-color: #FFFFFF; padding: 40px; border-radius: 20px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08); text-align: center;">
                            
                            <!-- Logo Section -->
                            <img src="https://res.cloudinary.com/dcmkct12y/image/upload/v1758273108/navdanapng_f7u6kv.png" alt="Navdana Logo" style="max-width: 140px; margin-bottom: 20px;">
                            
                            <!-- Header Section -->
                            <h1 style="font-size: 32px; line-height: 36px; font-weight: 700; margin-bottom: 8px; font-family: 'Dancing Script', cursive; color: #A44D1D;">
                                Navdana
                            </h1>
                            <h2 style="font-size: 18px; line-height: 26px; color: #555555; margin-bottom: 24px;">
                                Your One-Time Password
                            </h2>
    
                            <!-- Main Content Section -->
                            <p style="font-size: 16px; line-height: 24px; margin: 0 auto 16px auto; color: #232321;">
                                Hi Love,
                            </p>
                            <p style="font-size: 16px; line-height: 24px; margin: 0 auto 28px auto; color: #232321;">
                                Your one-time password (OTP) to log in to your Navdana account is:
                            </p>
    
                            <!-- OTP Code Block -->
                            <div style="background-color: #A44D1D; padding: 20px 32px; border-radius: 12px; display: inline-block; margin-bottom: 28px;">
                                <span style="font-size: 32px; line-height: 1; font-weight: 700; letter-spacing: 0.1em; color: #FFFFFF; word-wrap: break-word;">
                                    ${otp}
                                </span>
                            </div>
                            
                            <p style="font-size: 14px; line-height: 22px; color: #555555; margin: 0 0 12px 0;">
                                This OTP is valid for <b>5 minutes only</b>. Use it before it disappears like magic!
                            </p>

                            <!-- Footer Information -->
                            <p style="font-size: 12px; line-height: 18px; color: #555555; margin-top: 20px;">
                                If you did not request this, please ignore this email.
                            </p>
                            <p style="font-size: 14px; color: #555555; margin-top: 30px;">
                                Warm wishes,<br><b>Team Navdana</b>
                            </p>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}

module.exports = generateEmailTemplate