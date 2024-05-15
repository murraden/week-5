const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role: ['user'] });
    await user.save();
    res.status(201).send('User created successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).send('Invalid email or password.');
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).send('Invalid email or password.');
  
      const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
      res.send(token);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });
    res.status(200).send('Password updated successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { signup, login, changePassword };