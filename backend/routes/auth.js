import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = generateToken(user._id);
    res.json({ token, username: user.username, message: `Welcome, ${user.username}!`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password // Will be hashed by pre-save middleware
    });
    user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token, username: user.username, message:'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  NavigationHistoryEntry()
});

// Protected profile route
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;