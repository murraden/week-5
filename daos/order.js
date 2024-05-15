//daos.order.js

const Order = require('../models/order');
const Item = require('../models/item');

const createOrder = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required.' });
      }
  
      const { items: itemIds } = req.body;
      const items = await Item.find({ _id: { $in: itemIds } });
  
      const total = items.reduce((acc, item) => acc + item.price, 0);
  
      const newOrder = new Order({
        userId: req.user._id,
        items: items.map(item => item._id),
        total
      });
  
      await newOrder.save();
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getAllOrders = async (req, res) => {
    try {
      let orders;
      if (req.user.role === 'admin') {
        orders = await Order.find();
      } else {
        orders = await Order.find({ userId: req.user._id });
      }
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id).populate('items');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { createOrder, getAllOrders, getOrderById };