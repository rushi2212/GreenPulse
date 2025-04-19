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

exports.updatePaymentStatus = async (req, res) => {
const {orderId , status} = req.body ;
  

  try {
    // Find the order by ID and update the payment status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: status }, // Update the payment status
      { new: true } // Ensure the updated document is returned
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/my-orders
exports.getUserOrders = async (req, res) => {
  const userId = req.user.userId;

  try {
    const orders = await Order.find({ userId }).populate('products.productId', 'name price carbonEmission');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
