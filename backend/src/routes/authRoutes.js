const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { verifyJWT } = require('../middleware/auth');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get profile (protected)
router.get('/profile', verifyJWT, getProfile);

// Update profile (protected)
router.put('/profile', verifyJWT, updateProfile);

module.exports = router;
