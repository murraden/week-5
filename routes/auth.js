//routes.auth.js

const express = require('express');
const router = express.Router();
const { signup, login, changePassword } = require('../daos/auth');
const authenticateToken = require('../middleware/authentication');

router.post('/signup', signup);
router.post('/login', login);
router.put('/password', authenticateToken, changePassword);

module.exports = router;
