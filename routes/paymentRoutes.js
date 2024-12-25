const express = require('express');
// const { registerUser, loginUser } = require('../controllers/authController');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
module.exports = router;
