const router = require('express').Router();
const userRoutes = require('./users');
const budgetRoutes = require('./budget')

// API routes
router.use('/users', userRoutes);
router.use('/budget', budgetRoutes);

module.exports = router;
