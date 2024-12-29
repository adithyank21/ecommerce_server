


// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');



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

//     res.status(200).json({
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         phoneOrEmail: user.phoneOrEmail,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


const Usermodel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body; // Assuming you're using email to login

  try {
    // Find user by email
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with token and user details
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email, // Using email instead of phoneOrEmail
      },
    });
  } catch (error) {
    next(error); // Handle errors
  }
};
