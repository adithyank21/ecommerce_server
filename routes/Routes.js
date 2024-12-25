// const express = require('express');
// const { registerUser, loginUser } = require('../controllers/authController');
// const { createOrder, verifyPayment } = require('../controllers/paymentController');
// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post('/create-order', createOrder);
// router.post('/verify', verifyPayment);
// module.exports = router;

const express = require('express');
const {  loginUser } = require('../controllers/authController');

const router = express.Router();

// Register and login routes
router.post('/login', loginUser);

module.exports = router;


