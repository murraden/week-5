//daos.item.js

const Item = require('../models/item');
const mongoose = require('mongoose');

const createItem = async (req, res) => {
    try {
      const { title, price } = req.body;
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required.' });
      }
      if (!req.user.roles.includes("admin")) {
        return res.status(403).json({ message: "Forbidden: Only admin users can create items." });
    }
      // Check if title field is provided
      if (!title) {
        return res.status(400).json({ error: "Title field is required." });
      }
  
      const newItem = new Item({ title, price });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price } = req.body;
      const updatedItem = await Item.findByIdAndUpdate(id, { title, price }, { new: true });
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required.' });
      }
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getAllItems = async (req, res) => {
    try {
      const items = await Item.find();
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required.' });
      }
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getItemById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate id as an ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
      }
  
      const item = await Item.findById(id);
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { createItem, updateItem, getAllItems, getItemById };