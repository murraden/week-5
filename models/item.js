//models.item.js

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema);
