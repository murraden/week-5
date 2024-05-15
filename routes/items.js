//routes.items.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authentication');
const isAdmin = require('../middleware/authorization');
const { createItem, updateItem, getAllItems, getItemById } = require('../daos/item');

router.post('/', authenticateToken, isAdmin, createItem);
router.put('/:id', authenticateToken, isAdmin, updateItem);
router.get('/', authenticateToken, getAllItems);
router.get('/:id', authenticateToken, getItemById);

module.exports = router;