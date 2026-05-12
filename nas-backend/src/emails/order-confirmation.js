function orderConfirmationTemplate() {
  return `
<!DOCTYPE html>
<html lang="en" class="m-0 p-0">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width"/>
  <title>Order Confirmation - Rakesh Saunr</title>
  <style>
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
  </style>
</head>
<body class="m-0 p-0 bg-[#FCF4E7] font-sans text-[#232321]">
  
  <div class="flex justify-center p-6">
    <div class="bg-white max-w-[600px] w-full rounded-lg overflow-hidden text-center p-10">

      <!-- Logo -->
      <div class="mb-8">
        <img src="https://res.cloudinary.com/dalxsdm7s/image/upload/v1759926403/My%20Brand/logos_htjjat.png" 
             alt="Rakesh Saunr Logo" 
             class="mx-auto max-w-[150px]">
      </div>

      <!-- Thanks message -->
      <h1 class="text-2xl font-bold mb-6 bg-gradient-to-r from-[#00B25C] to-[#0076D6] text-transparent bg-clip-text">
        Thanks for your purchase!
      </h1>

      <!-- Shipping text -->
      <p class="text-base mb-8">
        We’re getting your order ready to be shipped. We will notify you when it has been sent.
      </p>

      <!-- View Order button -->
      <a href="https://www.rakeshsaunr.in/" 
         class="inline-block bg-gradient-to-r from-[#00B25C] to-[#0076D6] text-white font-bold py-3 px-6 rounded-md mb-8">
        View Order
      </a>

      <!-- Footer -->
      <div class="text-sm text-[#555]">
        <p>© ${new Date().getFullYear()} Rakesh Saunr. All rights reserved.</p>
      </div>

    </div>
  </div>

</body>
</html>
  `;
}

module.exports = orderConfirmationTemplate;
