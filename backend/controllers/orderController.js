const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.createOrder = async (req, res) => {
  const { products, totalAmount, totalCarbonEmission } = req.body;
  const userId = req.user.userId;

  try {
    const order = new Order({
      userId,
      products,
      totalAmount,
      totalCarbonEmission,
      paymentStatus: 'pending',
      deliveryStatus: 'processing',
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
