const User = require('../models/user');
const { sendOtpEmail } = require('../utils/otpHelper');
const crypto = require('crypto');

// Store OTPs temporarily (e.g., in memory or a database for production)
const otpStore = {};

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.register = async (req, res) => {
  const { name, phoneOrEmail, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ phoneOrEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this phone or email.' });
    }

    // Generate OTP
    const otp = generateOtp();
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Store OTP temporarily
    otpStore[phoneOrEmail] = { otp, otpExpiresAt };

    // Send OTP via email
    if (phoneOrEmail.includes('@')) {
      await sendOtpEmail(phoneOrEmail, otp);
    } else {
      // SMS simulation for phone number (actual SMS service can be integrated here)
      console.log(`Simulating OTP SMS to ${phoneOrEmail}: ${otp}`);
    }

    res.status(200).json({ message: 'OTP sent successfully.', phoneOrEmail });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phoneOrEmail, otp } = req.body;

  try {
    // Check if OTP exists and is valid
    const storedOtp = otpStore[phoneOrEmail];
    if (!storedOtp || storedOtp.otp !== otp || storedOtp.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // Create the user
    const { name, password } = req.body; // Add name and password from request body
    const user = new User({ name, phoneOrEmail, password });
    await user.save();

    // Remove OTP from the store
    delete otpStore[phoneOrEmail];

    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP.', error: error.message });
  }
};

exports.resendOtp = async (req, res) => {
  const { phoneOrEmail } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ phoneOrEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered with this phone or email.' });
    }

    // Generate new OTP
    const otp = generateOtp();
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Update OTP in store
    otpStore[phoneOrEmail] = { otp, otpExpiresAt };

    // Send OTP via email
    if (phoneOrEmail.includes('@')) {
      await sendOtpEmail(phoneOrEmail, otp);
    } else {
      // SMS simulation for phone number (actual SMS service can be integrated here)
      console.log(`Simulating OTP SMS to ${phoneOrEmail}: ${otp}`);
    }

    res.status(200).json({ message: 'OTP resent successfully.', phoneOrEmail });
  } catch (error) {
    res.status(500).json({ message: 'Error resending OTP.', error: error.message });
  }
};
