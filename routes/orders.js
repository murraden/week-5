//routes.orders.js

const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById } = require('../daos/order');
const authenticateToken = require('../middleware/authentication');
const isAdmin = require('../middleware/authorization');

router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, isAdmin, getAllOrders);
router.get('/:id', authenticateToken, getOrderById);

module.exports = router;