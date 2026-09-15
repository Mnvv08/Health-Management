const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, phone, role: 'user' });
    const token = generateToken(user._id);

    return res.status(201).json({ success: true, token, user: toPublicUser(user) });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    return res.status(200).json({ success: true, token, user: toPublicUser(user) });
  } catch (error) {
    return next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    return next(error);
  }
};

module.exports = { registerUser, loginUser, getMe };