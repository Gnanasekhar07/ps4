const express = require('express');
const router = express.Router();
const Finance = require('../models/Finance');
const User = require('../models/User');

// Middleware to check if user is authenticated
const authMiddleware = (req, res, next) => {
  // Implement your authentication logic here
  // For example, check for a valid token in headers
  next();
};

// Get financial data for a user
router.get('/api/finance/:userId', authMiddleware, async (req, res) => {
  try {
    const financeData = await Finance.findOne({ userId: req.params.userId });
    if (!financeData) {
      return res.status(404).json({ message: 'No financial data found for this user.' });
    }
    res.json(financeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update financial data for a user
router.post('/api/finance/:userId', authMiddleware, async (req, res) => {
  const { income, expenses, transactions } = req.body;
  try {
    const financeData = await Finance.findOneAndUpdate(
      { userId: req.params.userId },
      { income, expenses, transactions },
      { new: true, upsert: true } // Create if not exists
    );
    res.json(financeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
