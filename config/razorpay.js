// // const Razorpay = require('razorpay');

// // const razorpayInstance = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
// //   key_secret: process.env.RAZORPAY_SECRET, // Replace with your Razorpay Key Secret
// // });

// // module.exports = { razorpayInstance };

// console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
// console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);

// const Razorpay = require('razorpay');

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// module.exports = { razorpayInstance };

const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
  key_id: '123', // Replace with your Razorpay Key ID
  key_secret: 'R123', // Replace with your Razorpay Key Secret
});

module.exports = { razorpayInstance };

