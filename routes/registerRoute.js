// const express = require('express');
// const { register, verifyOtp, resendOtp } = require('../controllers//registerController');

// const router = express.Router();

// // Registration endpoint
// router.post('/register', register);

// // Verify OTP endpoint
// router.post('/verify-otp', verifyOtp);

// // Resend OTP endpoint
// router.post('/resend-otp', resendOtp);

// module.exports = router;



const express = require('express');
const { Reigster, VerfiyEmail } = require('../controllers/registerController');

const registerRoutes = express.Router();

registerRoutes.post('/register', Reigster);
registerRoutes.post('/verifyEmail', VerfiyEmail);

module.exports = registerRoutes;
