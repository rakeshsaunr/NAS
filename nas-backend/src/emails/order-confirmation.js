function orderConfirmationTemplate() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Navdana</title>
  </head>
  <body style="margin:0; padding:0; background-color: #FCF4E7; font-family: Arial, sans-serif;">
    
    <div style="display: flex; justify-content: center; padding: 20px;">
      <div style="background-color: #FFFFFF; max-width: 600px; width: 100%; border-radius: 8px; overflow: hidden; text-align: center; padding: 40px 20px;">
        
        <!-- Logo -->
        <div style="margin-bottom: 30px;">
          <img src="https://res.cloudinary.com/dcmkct12y/image/upload/v1758273108/navdanapng_f7u6kv.png" alt="Navdana Logo" style="max-width: 150px;">
        </div>
        
        <!-- Thanks message -->
        <h1 style="color: #232321; margin-bottom: 20px;">Thanks for your purchase!</h1>
        
        <!-- Shipping text -->
        <p style="color: #232321; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
          We’re getting your order ready to be shipped. We will notify you when it has been sent.
        </p>
        
        <!-- View Order button -->
        <a href="https://www.navdana.com" 
           style="background-color: #A44D1D; color: #FFFFFF; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">
          View Order
        </a>
  
        <!-- Footer -->
        <div style="margin-top: 40px; font-size: 14px; color: #555555;">
          <p>© ${new Date().getFullYear()} Navdana. All rights reserved.</p>
        </div>
  
      </div>
    </div>
    
  </body>
  </html>
  `;
}


module.exports = orderConfirmationTemplate