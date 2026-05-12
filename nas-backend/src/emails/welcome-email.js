module.exports = function welcomeEmailTemplate(firstName) {
  return `
<!DOCTYPE html>
<html lang="en" class="m-0 p-0">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width"/>
  <title>Welcome Email - Rakesh Saunr</title>
  <style>
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
  </style>
</head>
<body class="m-0 p-0 bg-[#FCF4E7] font-sans text-[#232321]">

  <div class="max-w-[600px] mx-auto bg-white rounded-[20px] shadow-lg p-10 text-center mt-10">
    
    <!-- Logo -->
    <img src="https://res.cloudinary.com/dalxsdm7s/image/upload/v1759926403/My%20Brand/logos_htjjat.png" 
         alt="Rakesh Saunr Logo" 
         class="mx-auto mb-6 max-w-[160px]">

    <!-- Heading -->
    <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00B25C] to-[#0076D6] text-transparent bg-clip-text">
      Woohoo! Thanks for Joining Rakesh Saunr 🎉
    </h1>

    <h2 class="text-xl font-semibold text-[#0076D6] mb-4">
      Hey ${firstName || "Rakesh Saunr Shopper"}!
    </h2>

    <!-- Welcome message -->
    <p class="text-base mb-4">
      Welcome to <b>Rakesh Saunr</b>—we’re thrilled you’re here!
    </p>
    <p class="text-base mb-6">
      You now have access to our full lineup of styles that mix comfort, elegance, and just the right amount of sass. Want to see what we’re all about?
    </p>

    <!-- Explore button -->
    <a href="https://www.rakeshsaunr.in" 
       class="inline-block bg-gradient-to-r from-[#00B25C] to-[#0076D6] text-white font-bold py-3 px-7 rounded-full mb-6 uppercase text-sm tracking-wider hover:from-[#0076D6] hover:to-[#00B25C] transition-colors">
      Explore the Collection
    </a>

    <!-- Next steps -->
    <h2 class="text-xl font-semibold text-[#0076D6] mb-3">What’s next?</h2>
    <ul class="text-left text-[#555] mb-6 mx-auto max-w-[460px] list-disc list-inside">
      <li>We’ll send you inspo (fashion mood boards, maybe some GIFs)</li>
      <li>First chance at anything new we launch</li>
      <li>Occasionally dropping deals in your inbox</li>
    </ul>

    <p class="text-base mb-6">
      Feel free to hit reply if you want help putting together a look, or if there’s something you’ve got your eye on.
    </p>

    <!-- Footer -->
    <p class="text-sm text-[#00B25C] mt-6">
      Cheers,<br><b>RAKESH SAUNR</b>
    </p>

  </div>

</body>
</html>
  `;
};
