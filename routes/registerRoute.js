const express = require('express');
const { register, verifyOtp, resendOtp } = require('../controllers//registerController');

const router = express.Router();

// Registration endpoint
router.post('/register', register);

// Verify OTP endpoint
router.post('/verify-otp', verifyOtp);

// Resend OTP endpoint
router.post('/resend-otp', resendOtp);

module.exports = router;
