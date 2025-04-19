const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
    },
  ],
  totalAmount: { type: Number, required: true },
  totalCarbonEmission: { type: Number }, // sum of product emissions
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  deliveryStatus: { type: String, enum: ['processing', 'shipped', 'delivered'], default: 'processing' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
