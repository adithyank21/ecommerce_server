


// // // const express = require('express');
// // // const router = express.Router();
// // // const { placeOrder, updateOrderStatus, getOrders, getOrderById, getOrderDetails } = require('../controllers/orderController');

// // // // Route to place an order
// // // router.post('/placeOrder', placeOrder);

// // // // Route to update order status
// // // router.put('/updateOrderStatus/:orderId', updateOrderStatus);

// // // // Route to get all orders
// // // router.get('/getOrders', getOrders);

// // // // Route to get a specific order by orderId
// // // router.get('/getOrder/:orderId', getOrderById);

// // // // Route to get detailed order information (with product details)
// // // router.get('/getOrderDetails/:orderId', getOrderDetails);

// // // module.exports = router;




// // const express = require('express');
// // const router = express.Router();
// // const { placeOrder, getOrdersByUserId, getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');

// // // Route to place an order
// // router.post('/placeOrder', placeOrder);

// // // Route to get orders by userId
// // router.get('/getOrdersByUser/:userId', getOrdersByUserId);

// // // Route to get all orders (Admin)
// // router.get('/getOrders', getAllOrders);

// // // Route to get a specific order by orderId (User or Admin)
// // router.get('/getOrder/:orderId', getOrderById);

// // // Route to update order status (Admin)
// // router.put('/updateOrderStatus/:orderId', updateOrderStatus);

// // module.exports = router;



// const express = require("express");
// const router = express.Router();
// const { placeOrder, getOrdersByUserId, getOrderById, getOrders,updateOrderStatus } = require('../controllers/orderController');

// // Place an order
// router.post('/place-order', placeOrder);

// // Get orders by user ID
// router.get('/getOrdersByUser/:userId', getOrdersByUserId);

// // Get order by order ID
// router.get('/getOrderById/:orderId', getOrderById);

// router.get('/getorders', getOrders);
// router.put('/updateOrderStatus', getOrders);





// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrdersByUserId,
  getOrderById,
  getOrders,
  updateOrderStatus
} = require("../controllers/orderController");

// Place an order
router.post("/place-order", placeOrder);

// Get orders by user ID
router.get("/getOrdersByUser/:userId", getOrdersByUserId);

// Get order by order ID
router.get("/getOrderById/:orderId", getOrderById);

// Get all orders
router.get("/getorders", getOrders);

// Update order status
router.put("/updateOrderStatus/:orderId", updateOrderStatus); // Corrected route

module.exports = router;


