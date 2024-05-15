//models.order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
