module.exports = function welcomeEmailTemplate(firstName) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email - Navdana</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #FCF4E7;
      font-family: 'Inter', sans-serif;
      color: #232321;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background: #FFFFFF;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      max-width: 160px;
      margin: 0 auto 20px;
    }
    h1 {
      font-family: 'Dancing Script', cursive;
      font-size: 32px;
      margin-bottom: 10px;
      color: #A44D1D;
    }
    h2 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #232321;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
      color: #232321;
    }
    ul {
      padding-left: 20px;
      margin-bottom: 25px;
      text-align: left;
      color: #555555;
    }
    ul li {
      margin-bottom: 10px;
      font-size: 15px;
    }
    .btn {
      display: inline-block;
      padding: 14px 28px;
      background: #A44D1D;
      color: #FFFFFF;
      text-decoration: none;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 50px;
      transition: background 0.3s ease;
      font-size: 14px;
      letter-spacing: 1px;
    }
    .btn:hover {
      background: #8a3f18;
    }
    .footer {
      font-size: 14px;
      color: #555555;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    
    <!-- Logo -->
    <img src="https://res.cloudinary.com/dcmkct12y/image/upload/v1758273108/navdanapng_f7u6kv.png" alt="Navdana Logo" class="logo">
    
    <h1>Woohoo! Thanks for Joining Navdana 🎉</h1>
    <h2>Hey ${firstName || "Navdana Shopper"}!</h2>

    <p>Welcome to <b>Navdana</b>—we’re thrilled you’re here!</p>
    <p>You now have access to our full lineup of styles that mix comfort, elegance, and just the right amount of sass. Want to see what we’re all about?</p>

    <p>
      <a href="https://www.navdana.com" class="btn">Explore the Collection</a>
    </p>

    <h2>What’s next?</h2>
    <ul>
      <li>We’ll send you inspo (fashion mood boards, maybe some GIFs)</li>
      <li>First chance at anything new we launch</li>
      <li>Occasionally dropping deals in your inbox</li>
    </ul>

    <p>Feel free to hit reply if you want help putting together a look, or if there’s something you’ve got your eye on.</p>

    <p class="footer">Cheers,<br><b>NAVDANA</b></p>
  </div>
</body>
</html>
  `;
};
