function generateEmailTemplate(otp) {
    return `
  <!DOCTYPE html>
  <html lang="en" class="m-0 p-0">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width"/>
    <title>Rakesh Saunr OTP Verification</title>
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light">
    <style>
      .preheader { 
        display:none !important; visibility:hidden; opacity:0; color:transparent; 
        height:0; width:0; overflow:hidden; mso-hide:all; 
      }
      a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    </style>
  </head>
  <body class="m-0 p-0 bg-[#FCF4E7] text-[#232321] font-sans">
    <div class="preheader">Your OTP for secure login. Expires in 5 minutes.</div>
  
    <table role="presentation" class="w-full" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" class="p-6">
          <table role="presentation" class="w-full max-w-[600px] mx-auto bg-white rounded-[20px] shadow-lg" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="py-10 px-8 text-center">
  
                <!-- Logo -->
                <img src="https://res.cloudinary.com/dalxsdm7s/image/upload/v1759926403/My%20Brand/logos_htjjat.png" 
                     alt="Rakesh Saunr Logo" 
                     class="mx-auto mb-6 block border-0 outline-none" 
                     width="140">
  
                <!-- Friendly Greeting -->
                <h1 class="text-2xl font-bold text-[#232321] mb-4">Hello there!</h1>
                <p class="mx-auto mb-6 max-w-[440px] text-base text-[#444]">
                  We’re happy to see you! Use the OTP below to securely log in to your account.
                </p>
  
                <!-- OTP Block -->
                <table role="presentation" class="mx-auto mb-6">
                  <tr>
                    <td class="bg-gradient-to-r from-[#00B25C] to-[#0076D6] py-6 px-9 rounded-xl shadow-md">
                      <span class="inline-block text-4xl font-extrabold tracking-widest text-white">
                        ${otp}
                      </span>
                    </td>
                  </tr>
                </table>
  
                <!-- Instructions -->
                <p class="mx-auto mb-3 max-w-[440px] text-sm text-[#0076D6]">
                  Your OTP is valid for <b>5 minutes</b>. Enter it promptly to complete your login.
                </p>
                <p class="mx-auto mb-6 max-w-[440px] text-sm text-[#444]">
                  If you did not request this OTP, you can safely ignore this email.
                </p>
  
                <!-- Signoff -->
                <p class="mt-6 text-base text-[#00B25C]">
                  Warm regards,<br><b>Team Rakesh Saunr</b>
                </p>
  
                <!-- Footer Divider -->
                <div class="h-px bg-[#eee] my-6"></div>
  
                <!-- Footer Meta -->
                <p class="text-xs text-[#999]">
                  © 2025 Rakesh Saunr. All rights reserved.
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
  
  module.exports = generateEmailTemplate;
  
