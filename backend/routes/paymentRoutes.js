const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_zTR8e0CVAFaw54",
  key_secret: "TT8MFpz53JSF5iym1ATqC50s",
});

// Route to create an order
router.post("/order", async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount, // Amount in paise (1 INR = 100 paise)
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpay.orders.create(options);
    res.json({order});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating Razorpay order" });

  }
});

// Route to verify the payment
router.post("/verify", (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  const body = `${order_id}|${payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", "TT8MFpz53JSF5iym1ATqC50s")
    .update(body)
    .digest("hex");

  if (expectedSignature === signature) {
    // Payment is verified
    // Process the order (e.g., update order status in the database)
    res.json({ success: true, message: "Payment Verified" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});

module.exports = router;
