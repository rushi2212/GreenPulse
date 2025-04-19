const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  permissions: [String], // e.g., ['MANAGE_PRODUCTS', 'VIEW_STATS']
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);