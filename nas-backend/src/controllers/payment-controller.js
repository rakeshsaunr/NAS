const crypto = require("crypto");
const OrderService = require("../services/order-service");

async function verifyPayment(req, res) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    // signature check
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Update order in DB
      const order = await OrderService.updateOrderPayment(
        razorpay_order_id,
        {
          paymentId: razorpay_payment_id,
          status: "paid",
          isPaid: true
        }
      );

      return res.json({
        success: true,
        message: "Payment verified",
        order,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
}

module.exports = { verifyPayment };
