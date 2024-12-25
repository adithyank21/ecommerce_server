



// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.registerUser = async (req, res, next) => {
//   const { username, phoneOrEmail, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ phoneOrEmail });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const newUser = new User({ username, phoneOrEmail, password });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.loginUser = async (req, res, next) => {
//   const { phoneOrEmail, password } = req.body;

//   try {
//     const user = await User.findOne({ phoneOrEmail });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     res.status(200).json({ token });
//   } catch (error) {
//     next(error);
//   }
// };


const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.loginUser = async (req, res, next) => {
  const { phoneOrEmail, password } = req.body;

  try {
    const user = await User.findOne({ phoneOrEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        phoneOrEmail: user.phoneOrEmail,
      },
    });
  } catch (error) {
    next(error);
  }
};
