



// // // // // // // const Order = require('../models/order');
// // // // // // // const Product = require('../models/product');

// // // // // // // // Place Order
// // // // // // // const placeOrder = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { orderId, address, paymentMethod, products } = req.body;

// // // // // // //     // Map through products to include product details
// // // // // // //     const orderProducts = await Promise.all(
// // // // // // //       products.map(async (product) => {
// // // // // // //         const productDetails = await Product.findById(product.productId);
// // // // // // //         if (!productDetails) {
// // // // // // //           throw new Error(`Product with ID ${product.productId} not found`);
// // // // // // //         }
// // // // // // //         return {
// // // // // // //           productId: product.productId,
// // // // // // //           quantity: product.quantity,
// // // // // // //           price: productDetails.price,
// // // // // // //         };
// // // // // // //       })
// // // // // // //     );

// // // // // // //     const newOrder = new Order({
// // // // // // //       orderId,
// // // // // // //       address,
// // // // // // //       paymentMethod,
// // // // // // //       products: orderProducts,
// // // // // // //     });

// // // // // // //     await newOrder.save();
// // // // // // //     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).json({ message: 'Error placing the order', error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Update Order Status
// // // // // // // const updateOrderStatus = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { status } = req.body;
// // // // // // //     const order = await Order.findOne({ orderId: req.params.orderId });

// // // // // // //     if (!order) {
// // // // // // //       return res.status(404).json({ message: 'Order not found' });
// // // // // // //     }

// // // // // // //     order.status = status;
// // // // // // //     await order.save();

// // // // // // //     res.status(200).json({ message: 'Order status updated successfully', order });
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).json({ message: 'Error updating order status', error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get All Orders
// // // // // // // const getOrders = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const orders = await Order.find().populate('products.productId', 'name price image');
// // // // // // //     res.status(200).json({ orders });
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).json({ message: 'Error fetching orders', error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get Order by ID
// // // // // // // const getOrderById = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const order = await Order.findOne({ orderId: req.params.orderId.toString() }).populate('products.productId', 'name price image');
// // // // // // //     if (!order) {
// // // // // // //       return res.status(404).json({ message: 'Order not found' });
// // // // // // //     }
// // // // // // //     res.status(200).json({ order });
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).json({ message: 'Error fetching order', error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get Detailed Order Information by ID (Including Product Images)
// // // // // // // const getOrderDetails = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const order = await Order.findOne({ orderId: req.params.orderId }).populate('products.productId', 'name description price image');
// // // // // // //     if (!order) {
// // // // // // //       return res.status(404).json({ message: 'Order not found' });
// // // // // // //     }

// // // // // // //     // Include product details in the response
// // // // // // //     const detailedProducts = order.products.map((product) => ({
// // // // // // //       productId: product.productId._id,
// // // // // // //       name: product.productId.name,
// // // // // // //       description: product.productId.description,
// // // // // // //       price: product.price,
// // // // // // //       quantity: product.quantity,
// // // // // // //       image: product.productId.image, // Include the image field
// // // // // // //     }));

// // // // // // //     res.status(200).json({
// // // // // // //       orderId: order.orderId,
// // // // // // //       address: order.address,
// // // // // // //       paymentMethod: order.paymentMethod,
// // // // // // //       status: order.status,
// // // // // // //       products: detailedProducts,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).json({ message: 'Error fetching order details', error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // module.exports = { placeOrder, updateOrderStatus, getOrders, getOrderById, getOrderDetails };



// // // // // // // // const placeOrder = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { orderId, address, paymentMethod, products, userId } = req.body; // Include userId in the request body

// // // // // // // //     if (!userId) {
// // // // // // // //       return res.status(400).json({ message: 'User ID is required' });
// // // // // // // //     }

// // // // // // // //     // Map through products to include product details
// // // // // // // //     const orderProducts = await Promise.all(
// // // // // // // //       products.map(async (product) => {
// // // // // // // //         const productDetails = await Product.findById(product.productId);
// // // // // // // //         if (!productDetails) {
// // // // // // // //           throw new Error(`Product with ID ${product.productId} not found`);
// // // // // // // //         }
// // // // // // // //         return {
// // // // // // // //           productId: product.productId,
// // // // // // // //           quantity: product.quantity,
// // // // // // // //           price: productDetails.price,
// // // // // // // //         };
// // // // // // // //       })
// // // // // // // //     );

// // // // // // // //     const newOrder = new Order({
// // // // // // // //       orderId,
// // // // // // // //       userId, // Add userId to the new order
// // // // // // // //       address,
// // // // // // // //       paymentMethod,
// // // // // // // //       products: orderProducts,
// // // // // // // //     });

// // // // // // // //     await newOrder.save();
// // // // // // // //     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
// // // // // // // //   } catch (error) {
// // // // // // // //     res.status(500).json({ message: 'Error placing the order', error: error.message });
// // // // // // // //   }
// // // // // // // // };


// // // // // // // // const Order = require('../models/order');
// // // // // // // // const Product = require('../models/product');

// // // // // // // // // Place Order
// // // // // // // // const placeOrder = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { userId, products } = req.body; // Only receive userId and products

// // // // // // // //     if (!userId) {
// // // // // // // //       return res.status(400).json({ message: 'User ID is required' });
// // // // // // // //     }

// // // // // // // //     // Map through products to include product details (price)
// // // // // // // //     const orderProducts = await Promise.all(
// // // // // // // //       products.map(async (product) => {
// // // // // // // //         const productDetails = await Product.findById(product.productId);
// // // // // // // //         if (!productDetails) {
// // // // // // // //           throw new Error(`Product with ID ${product.productId} not found`);
// // // // // // // //         }
// // // // // // // //         return {
// // // // // // // //           productId: product.productId,
// // // // // // // //           quantity: product.quantity,
// // // // // // // //           price: productDetails.price,
// // // // // // // //         };
// // // // // // // //       })
// // // // // // // //     );

// // // // // // // //     // Create the new order
// // // // // // // //     const newOrder = new Order({
// // // // // // // //       userId, // User placing the order
// // // // // // // //       products: orderProducts, // Product details and quantities
// // // // // // // //     });

// // // // // // // //     await newOrder.save();
// // // // // // // //     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
// // // // // // // //   } catch (error) {
// // // // // // // //     res.status(500).json({ message: 'Error placing the order', error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // module.exports = { placeOrder };



// // // // // // const Order = require('../models/order');
// // // // // // const Product = require('../models/product');

// // // // // // // Place Order
// // // // // // const placeOrder = async (req, res) => {
// // // // // //   try {
// // // // // //     const { userId, products, address, paymentMethod } = req.body;

// // // // // //     // Validate if the user exists (if required)
// // // // // //     if (!userId) {
// // // // // //       return res.status(400).json({ message: 'User ID is required' });
// // // // // //     }

// // // // // //     if (!products || products.length === 0) {
// // // // // //       return res.status(400).json({ message: 'At least one product is required' });
// // // // // //     }

// // // // // //     // Validate if products are available in stock
// // // // // //     let totalAmount = 0;
// // // // // //     const orderProducts = [];
// // // // // //     for (let i = 0; i < products.length; i++) {
// // // // // //       const product = await Product.findById(products[i].productId);
// // // // // //       if (!product) {
// // // // // //         return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });
// // // // // //       }

// // // // // //       if (product.stock < products[i].quantity) {
// // // // // //         return res.status(400).json({ message: `Not enough stock for ${product.name}` });
// // // // // //       }

// // // // // //       product.stock -= products[i].quantity; // Update stock
// // // // // //       await product.save(); // Save updated product stock

// // // // // //       orderProducts.push({
// // // // // //         productId: products[i].productId,
// // // // // //         quantity: products[i].quantity,
// // // // // //         price: product.price
// // // // // //       });

// // // // // //       totalAmount += product.price * products[i].quantity; // Calculate total amount
// // // // // //     }

// // // // // //     // Create a new order
// // // // // //     const newOrder = new Order({
// // // // // //       userId,
// // // // // //       products: orderProducts,
// // // // // //       totalAmount,
// // // // // //       address,
// // // // // //       paymentMethod
// // // // // //     });

// // // // // //     await newOrder.save();

// // // // // //     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ message: 'Error placing the order', error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Get all Orders by User ID
// // // // // // const getOrdersByUserId = async (req, res) => {
// // // // // //   try {
// // // // // //     const { userId } = req.params;

// // // // // //     // Get orders by userId
// // // // // //     const orders = await Order.find({ userId }).populate('products.productId', 'name price');

// // // // // //     if (!orders || orders.length === 0) {
// // // // // //       return res.status(404).json({ message: 'No orders found for this user' });
// // // // // //     }

// // // // // //     res.status(200).json({ orders });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ message: 'Error fetching orders by user', error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Get all Orders (Admin)
// // // // // // const getAllOrders = async (req, res) => {
// // // // // //   try {
// // // // // //     const orders = await Order.find().populate('userId', 'username email').populate('products.productId', 'name price');
// // // // // //     res.status(200).json({ orders });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ message: 'Error fetching orders', error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Get Order by Order ID
// // // // // // const getOrderById = async (req, res) => {
// // // // // //   try {
// // // // // //     const order = await Order.findById(req.params.orderId)
// // // // // //       .populate('userId', 'username email')
// // // // // //       .populate('products.productId', 'name price');

// // // // // //     if (!order) {
// // // // // //       return res.status(404).json({ message: 'Order not found' });
// // // // // //     }

// // // // // //     res.status(200).json({ order });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ message: 'Error fetching order', error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Update Order Status (Admin)
// // // // // // const updateOrderStatus = async (req, res) => {
// // // // // //   try {
// // // // // //     const { status } = req.body;
// // // // // //     const order = await Order.findById(req.params.orderId);

// // // // // //     if (!order) {
// // // // // //       return res.status(404).json({ message: 'Order not found' });
// // // // // //     }

// // // // // //     order.status = status;
// // // // // //     await order.save();

// // // // // //     res.status(200).json({ message: 'Order status updated successfully', order });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ message: 'Error updating order status', error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // module.exports = {
// // // // // //   placeOrder,
// // // // // //   getOrdersByUserId,
// // // // // //   getAllOrders,
// // // // // //   getOrderById,
// // // // // //   updateOrderStatus
// // // // // // };




// // // // // const { v4: uuidv4 } = require('uuid'); // Import the uuid package
// // // // // const Order = require('../models/order');
// // // // // const Product = require('../models/product');

// // // // // // Place Order
// // // // // const placeOrder = async (req, res) => {
// // // // //   try {
// // // // //     const { userId, products, address, paymentMethod } = req.body;

// // // // //     // Validate if the user exists (if required)
// // // // //     if (!userId) {
// // // // //       return res.status(400).json({ message: 'User ID is required' });
// // // // //     }

// // // // //     if (!products || products.length === 0) {
// // // // //       return res.status(400).json({ message: 'At least one product is required' });
// // // // //     }

// // // // //     // Validate if products are available in stock
// // // // //     let totalAmount = 0;
// // // // //     const orderProducts = [];
// // // // //     for (let i = 0; i < products.length; i++) {
// // // // //       const product = await Product.findById(products[i].productId);
// // // // //       if (!product) {
// // // // //         return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });
// // // // //       }

// // // // //       if (product.stock < products[i].quantity) {
// // // // //         return res.status(400).json({ message: `Not enough stock for ${product.name}` });
// // // // //       }

// // // // //       product.stock -= products[i].quantity; // Update stock
// // // // //       await product.save(); // Save updated product stock

// // // // //       orderProducts.push({
// // // // //         productId: products[i].productId,
// // // // //         quantity: products[i].quantity,
// // // // //         price: product.price
// // // // //       });

// // // // //       totalAmount += product.price * products[i].quantity; // Calculate total amount
// // // // //     }

// // // // //     // Generate a unique orderId
// // // // //     const orderId = uuidv4(); // Generate unique order ID

// // // // //     // Create a new order
// // // // //     const newOrder = new Order({
// // // // //       orderId, // Use the generated orderId here
// // // // //       userId,
// // // // //       products: orderProducts,
// // // // //       totalAmount,
// // // // //       address,
// // // // //       paymentMethod
// // // // //     });

// // // // //     await newOrder.save();

// // // // //     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: 'Error placing the order', error: error.message });
// // // // //   }
// // // // // };

// // // // // // Get all Orders by User ID
// // // // // const getOrdersByUserId = async (req, res) => {
// // // // //   try {
// // // // //     const { userId } = req.params;

// // // // //     // Get orders by userId
// // // // //     const orders = await Order.find({ userId }).populate('products.productId', 'name price');

// // // // //     if (!orders || orders.length === 0) {
// // // // //       return res.status(404).json({ message: 'No orders found for this user' });
// // // // //     }

// // // // //     res.status(200).json({ orders });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: 'Error fetching orders by user', error: error.message });
// // // // //   }
// // // // // };

// // // // // // Get all Orders (Admin)
// // // // // const getAllOrders = async (req, res) => {
// // // // //   try {
// // // // //     const orders = await Order.find().populate('userId', 'username email').populate('products.productId', 'name price');
// // // // //     res.status(200).json({ orders });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: 'Error fetching orders', error: error.message });
// // // // //   }
// // // // // };

// // // // // // Get Order by Order ID
// // // // // const getOrderById = async (req, res) => {
// // // // //   try {
// // // // //     const order = await Order.findById(req.params.orderId)
// // // // //       .populate('userId', 'username email')
// // // // //       .populate('products.productId', 'name price');

// // // // //     if (!order) {
// // // // //       return res.status(404).json({ message: 'Order not found' });
// // // // //     }

// // // // //     res.status(200).json({ order });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: 'Error fetching order', error: error.message });
// // // // //   }
// // // // // };

// // // // // // Update Order Status (Admin)
// // // // // const updateOrderStatus = async (req, res) => {
// // // // //   try {
// // // // //     const { status } = req.body;
// // // // //     const order = await Order.findById(req.params.orderId);

// // // // //     if (!order) {
// // // // //       return res.status(404).json({ message: 'Order not found' });
// // // // //     }

// // // // //     order.status = status;
// // // // //     await order.save();

// // // // //     res.status(200).json({ message: 'Order status updated successfully', order });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: 'Error updating order status', error: error.message });
// // // // //   }
// // // // // };

// // // // // module.exports = {
// // // // //   placeOrder,
// // // // //   getOrdersByUserId,
// // // // //   getAllOrders,
// // // // //   getOrderById,
// // // // //   updateOrderStatus
// // // // // };



// // // // // const { v4: uuidv4 } = require('uuid'); // Import uuid package
// // // // // const Order = require('../models/order');
// // // // // const Product = require('../models/product');

// // // // // // Place Order
// // // // // const placeOrder = async (req, res) => {
// // // // //   try {
// // // // //     const { userId, products, address, paymentMethod } = req.body;

// // // // //     // Validate if the user exists (if required)
// // // // //     if (!userId) {
// // // // //       return res.status(400).json({ message: 'User ID is required' });
// // // // //     }

// // // // //     if (!products || products.length === 0) {
// // // // //       return res.status(400).json({ message: 'At least one product is required' });
// // // // //     }

// // // // //     // Validate if products are available in stock
// // // // //     let totalAmount = 0;
// // // // //     const orderProducts = [];
// // // // //     for (let i = 0; i < products.length; i++) {
// // // // //       const product = await Product.findById(products[i].productId);
// // // // //       if (!product) {
// // // // //         return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });
// // // // //       }

// // // // //       if (product.stock < products[i].quantity) {
// // // // //         return res.status(400).json({ message: `Not enough stock for ${product.name}` });
// // // // //       }

// // // // //       product.stock -= products[i].quantity; // Update stock
// // // // //       await product.save(); // Save updated product stock

// // // // //       orderProducts.push({
// // // // //         productId: products[i].productId,
// // // // //         quantity: products[i].quantity,
// // // // //         price: product.price
// // // // //       });

// // // // //       totalAmount += product.price * products[i].quantity; // Calculate total amount
// // // // //     }

// // // // //     const orderId = uuidv4(); // Generate a unique order ID

// // // // //     // Create a new order
// // // // //     const newOrder = new Order({
// // // // //       orderId, // Use the generated orderId
// // // // //       userId,
// // // // //       products: orderProducts,
// // // // //       totalAmount,
// // // // //       address,
// // // // //       paymentMethod
// // // // //     });

// // // // //     await newOrder.save();

// // // // //     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: 'Error placing the order', error: error.message });
// // // // //   }
// // // // // };


// // // // const { v4: uuidv4 } = require('uuid'); // Import uuid package
// // // // const Order = require('../models/order');
// // // // const Product = require('../models/product');

// // // // // Place Order
// // // // const placeOrder = async (req, res) => {
// // // //   try {
// // // //     const { userId, products, address, paymentMethod } = req.body;

// // // //     // Validate if the user exists (if required)
// // // //     if (!userId) {
// // // //       return res.status(400).json({ message: 'User ID is required' });
// // // //     }

// // // //     if (!products || products.length === 0) {
// // // //       return res.status(400).json({ message: 'At least one product is required' });
// // // //     }

// // // //     // Validate if products are available in stock
// // // //     let totalAmount = 0;
// // // //     const orderProducts = [];
// // // //     for (let i = 0; i < products.length; i++) {
// // // //       const product = await Product.findById(products[i].productId);
// // // //       if (!product) {
// // // //         return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });
// // // //       }

// // // //       if (product.stock < products[i].quantity) {
// // // //         return res.status(400).json({ message: `Not enough stock for ${product.name}` });
// // // //       }

// // // //       product.stock -= products[i].quantity; // Update stock
// // // //       await product.save(); // Save updated product stock

// // // //       orderProducts.push({
// // // //         productId: products[i].productId,
// // // //         quantity: products[i].quantity,
// // // //         price: product.price
// // // //       });

// // // //       totalAmount += product.price * products[i].quantity; // Calculate total amount
// // // //     }

// // // //     // Ensure valid orderId generation (UUIDv4)
// // // //     const orderId = uuidv4(); // Generate a unique order ID

// // // //     // Create a new order
// // // //     const newOrder = new Order({
// // // //       orderId, // Use the generated orderId
// // // //       userId,
// // // //       products: orderProducts,
// // // //       totalAmount,
// // // //       address,
// // // //       paymentMethod
// // // //     });

// // // //     await newOrder.save();

// // // //     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
// // // //   } catch (error) {
// // // //     console.error('Error placing the order:', error);
// // // //     res.status(500).json({ message: 'Error placing the order', error: error.message });
// // // //   }
// // // // };

// // // // // Get all Orders by User ID
// // // // const getOrdersByUserId = async (req, res) => {
// // // //   try {
// // // //     const { userId } = req.params;

// // // //     // Get orders by userId
// // // //     const orders = await Order.find({ userId }).populate('products.productId', 'name price');

// // // //     if (!orders || orders.length === 0) {
// // // //       return res.status(404).json({ message: 'No orders found for this user' });
// // // //     }

// // // //     res.status(200).json({ orders });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Error fetching orders by user', error: error.message });
// // // //   }
// // // // };

// // // // // Get all Orders (Admin)
// // // // const getAllOrders = async (req, res) => {
// // // //   try {
// // // //     const orders = await Order.find().populate('userId', 'username email').populate('products.productId', 'name price');
// // // //     res.status(200).json({ orders });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Error fetching orders', error: error.message });
// // // //   }
// // // // };

// // // // // Get Order by Order ID
// // // // const getOrderById = async (req, res) => {
// // // //   try {
// // // //     const order = await Order.findById(req.params.orderId)
// // // //       .populate('userId', 'username email')
// // // //       .populate('products.productId', 'name price');

// // // //     if (!order) {
// // // //       return res.status(404).json({ message: 'Order not found' });
// // // //     }

// // // //     res.status(200).json({ order });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Error fetching order', error: error.message });
// // // //   }
// // // // };

// // // // // Update Order Status (Admin)
// // // // const updateOrderStatus = async (req, res) => {
// // // //   try {
// // // //     const { status } = req.body;
// // // //     const order = await Order.findById(req.params.orderId);

// // // //     if (!order) {
// // // //       return res.status(404).json({ message: 'Order not found' });
// // // //     }

// // // //     order.status = status;
// // // //     await order.save();

// // // //     res.status(200).json({ message: 'Order status updated successfully', order });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Error updating order status', error: error.message });
// // // //   }
// // // // };

// // // // module.exports = {
// // // //   placeOrder,
// // // //   getOrdersByUserId,
// // // //   getAllOrders,
// // // //   getOrderById,
// // // //   updateOrderStatus
// // // // };



// // // const { v4: uuidv4 } = require('uuid'); // Import uuid package
// // // const Order = require('../models/order');
// // // const Product = require('../models/product');

// // // // Place Order
// // // const placeOrder = async (req, res) => {
// // //   try {
// // //     const { userId, products, address, paymentMethod } = req.body;

// // //     // Validate if the user exists (if required)
// // //     if (!userId) {
// // //       return res.status(400).json({ message: 'User ID is required' });
// // //     }

// // //     if (!products || products.length === 0) {
// // //       return res.status(400).json({ message: 'At least one product is required' });
// // //     }

// // //     // Validate if products are available in stock
// // //     let totalAmount = 0;
// // //     const orderProducts = [];
// // //     for (let i = 0; i < products.length; i++) {
// // //       const product = await Product.findById(products[i].productId);
// // //       if (!product) {
// // //         return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });
// // //       }

// // //       if (product.stock < products[i].quantity) {
// // //         return res.status(400).json({ message: `Not enough stock for ${product.name}` });
// // //       }

// // //       product.stock -= products[i].quantity; // Update stock
// // //       await product.save(); // Save updated product stock

// // //       orderProducts.push({
// // //         productId: products[i].productId,
// // //         quantity: products[i].quantity,
// // //         price: product.price
// // //       });

// // //       totalAmount += product.price * products[i].quantity; // Calculate total amount
// // //     }

// // //     // Ensure valid orderId generation (UUIDv4)
// // //     const orderId = uuidv4(); // Generate a unique order ID

// // //     // Create a new order
// // //     const newOrder = new Order({
// // //       orderId, // Use the generated orderId
// // //       userId,
// // //       products: orderProducts,
// // //       totalAmount,
// // //       address,
// // //       paymentMethod
// // //     });

// // //     await newOrder.save();

// // //     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
// // //   } catch (error) {
// // //     console.error('Error placing the order:', error);
// // //     res.status(500).json({ message: 'Error placing the order', error: error.message });
// // //   }
// // // };

// // // // Get all Orders by User ID
// // // // const getOrdersByUserId = async (req, res) => {
// // // //   try {
// // // //     const { userId } = req.params;

// // // //     // Get orders by userId
// // // //     const orders = await Order.find({ userId })
// // // //       .populate('products.productId', 'name price image') // Populate the image field
// // // //       .exec();

// // // //     if (!orders || orders.length === 0) {
// // // //       return res.status(404).json({ message: 'No orders found for this user' });
// // // //     }

// // // //     res.status(200).json({ orders });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Error fetching orders by user', error: error.message });
// // // //   }
// // // // };

// // // // Get all Orders by User ID
// // // const getOrdersByUserId = async (req, res) => {
// // //   try {
// // //     const { userId } = req.params;

// // //     // Get orders by userId and populate the product details including the image field
// // //     const orders = await Order.find({ userId })
// // //       .populate('products.productId', 'name price image') // Include image in the populated product data
// // //       .exec();

// // //     if (!orders || orders.length === 0) {
// // //       return res.status(404).json({ message: 'No orders found for this user' });
// // //     }

// // //     res.status(200).json({ orders });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error fetching orders by user', error: error.message });
// // //   }
// // // };


// // // // Get all Orders (Admin)
// // // const getAllOrders = async (req, res) => {
// // //   try {
// // //     const orders = await Order.find()
// // //       .populate('userId', 'username email')
// // //       .populate('products.productId', 'name price image') // Include the image field in the product
// // //       .exec();
// // //     res.status(200).json({ orders });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error fetching orders', error: error.message });
// // //   }
// // // };

// // // // Get Order by Order ID
// // // const getOrderById = async (req, res) => {
// // //   try {
// // //     const order = await Order.findById(req.params.orderId)
// // //       .populate('userId', 'username email')
// // //       .populate('products.productId', 'name price image') // Include the image field in the product
// // //       .exec();

// // //     if (!order) {
// // //       return res.status(404).json({ message: 'Order not found' });
// // //     }

// // //     res.status(200).json({ order });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error fetching order', error: error.message });
// // //   }
// // // };

// // // // Update Order Status (Admin)
// // // const updateOrderStatus = async (req, res) => {
// // //   try {
// // //     const { status } = req.body;
// // //     const order = await Order.findById(req.params.orderId);

// // //     if (!order) {
// // //       return res.status(404).json({ message: 'Order not found' });
// // //     }

// // //     order.status = status;
// // //     await order.save();

// // //     res.status(200).json({ message: 'Order status updated successfully', order });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error updating order status', error: error.message });
// // //   }
// // // };

// // // module.exports = {
// // //   placeOrder,
// // //   getOrdersByUserId,
// // //   getAllOrders,
// // //   getOrderById,
// // //   updateOrderStatus
// // // };



// // const { v4: uuidv4 } = require('uuid');
// // const Order = require('../models/order');
// // const Product = require('../models/product');

// // // Place Order
// // const placeOrder = async (req, res) => {
// //   try {
// //     const { userId, products, address, paymentMethod } = req.body;

// //     if (!userId) return res.status(400).json({ message: 'User ID is required' });
// //     if (!products || products.length === 0) return res.status(400).json({ message: 'At least one product is required' });

// //     let totalAmount = 0;
// //     const orderProducts = [];

// //     for (let i = 0; i < products.length; i++) {
// //       const product = await Product.findById(products[i].productId);
// //       if (!product) return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });

// //       if (product.stock < products[i].quantity) {
// //         return res.status(400).json({ message: `Not enough stock for ${product.name}` });
// //       }

// //       product.stock -= products[i].quantity;  // Update stock
// //       await product.save();  // Save the updated product stock

// //       orderProducts.push({
// //         productId: products[i].productId,
// //         quantity: products[i].quantity,
// //         price: product.price,
// //       });

// //       totalAmount += product.price * products[i].quantity;
// //     }

// //     // Generate a unique order ID
// //     const orderId = uuidv4();

// //     // Create and save the new order
// //     const newOrder = new Order({
// //       orderId,
// //       userId,
// //       products: orderProducts,
// //       totalAmount,
// //       address,
// //       paymentMethod,
// //     });

// //     await newOrder.save();
// //     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Error placing order', error: error.message });
// //   }
// // };

// // // Get Orders by User ID
// // const getOrdersByUserId = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     const orders = await Order.find({ userId })
// //       .populate('products.productId', 'name price image')  // Populate with product details including image
// //       .exec();

// //     if (!orders || orders.length === 0) {
// //       return res.status(404).json({ message: 'No orders found for this user' });
// //     }

// //     res.status(200).json({ orders });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching orders by user', error: error.message });
// //   }
// // };

// // // Get Order by Order ID
// // const getOrderById = async (req, res) => {
// //   try {
// //     const { orderId } = req.params;

// //     const order = await Order.findOne({ orderId })
// //       .populate('products.productId', 'name price image')  // Populate with product details including image
// //       .exec();

// //     if (!order) {
// //       return res.status(404).json({ message: 'Order not found' });
// //     }

// //     res.status(200).json({ order });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching order by order ID', error: error.message });
// //   }
// // };

// // module.exports = {
// //   placeOrder,
// //   getOrdersByUserId,
// //   getOrderById,
// // };



// const { v4: uuidv4 } = require('uuid');
// const Order = require('../models/order');
// const Product = require('../models/product');

// // Place Order
// const placeOrder = async (req, res) => {
//   try {
//     const { userId, products, address, paymentMethod } = req.body;

//     if (!userId) return res.status(400).json({ message: 'User ID is required' });
//     if (!products || products.length === 0) return res.status(400).json({ message: 'At least one product is required' });

//     let totalAmount = 0;
//     const orderProducts = [];

//     for (let i = 0; i < products.length; i++) {
//       const product = await Product.findById(products[i].productId);
//       if (!product) return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });

//       if (product.stock < products[i].quantity) {
//         return res.status(400).json({ message: `Not enough stock for ${product.name}` });
//       }

//       product.stock -= products[i].quantity;  // Update stock
//       await product.save();  // Save the updated product stock

//       orderProducts.push({
//         productId: products[i].productId,
//         quantity: products[i].quantity,
//         price: product.price,
//         image: product.image, // Include product image in the order
//       });

//       totalAmount += product.price * products[i].quantity;
//     }

//     // Generate a unique order ID
//     const orderId = uuidv4();

//     // Create and save the new order
//     const newOrder = new Order({
//       orderId,
//       userId,
//       products: orderProducts,
//       totalAmount,
//       address,
//       paymentMethod,
//     });

//     await newOrder.save();
//     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error placing order', error: error.message });
//   }
// };

// // Get Orders by User ID
// const getOrdersByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const orders = await Order.find({ userId })
//       .populate('products.productId', 'name price image')  // Populate with product details including image
//       .exec();

//     if (!orders || orders.length === 0) {
//       return res.status(404).json({ message: 'No orders found for this user' });
//     }

//     res.status(200).json({ orders });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching orders by user', error: error.message });
//   }
// };

// // Get Order by Order ID
// const getOrderById = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findOne({ orderId })
//       .populate('products.productId', 'name price image')  // Populate with product details including image
//       .exec();

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json({ order });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching order by order ID', error: error.message });
//   }
// };
// // Update Order Status
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const order = await Order.findOne({ orderId: req.params.orderId });

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     order.status = status;
//     await order.save();

//     res.status(200).json({ message: 'Order status updated successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating order status', error: error.message });
//   }
// };

// // Get All Orders
// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('products.productId', 'name price image');
//     res.status(200).json({ orders });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching orders', error: error.message });
//   }
// };




// module.exports = {
//   placeOrder,
//   getOrdersByUserId,
//   getOrderById,
//   getOrders,
//   updateOrderStatus // Export getAllOrders

// };



const { v4: uuidv4 } = require("uuid");
const Order = require("../models/order");
const Product = require("../models/product");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const { userId, products, address, paymentMethod } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID is required" });
    if (!products || products.length === 0)
      return res.status(400).json({ message: "At least one product is required" });

    let totalAmount = 0;
    const orderProducts = [];

    for (let i = 0; i < products.length; i++) {
      const product = await Product.findById(products[i].productId);
      if (!product)
        return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });

      if (product.stock < products[i].quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      product.stock -= products[i].quantity; // Update stock
      await product.save(); // Save the updated product stock

      orderProducts.push({
        productId: products[i].productId,
        quantity: products[i].quantity,
        price: product.price,
        image: product.image // Include product image in the order
      });

      totalAmount += product.price * products[i].quantity;
    }

    // Generate a unique order ID
    const orderId = uuidv4();

    // Create and save the new order
    const newOrder = new Order({
      orderId,
      userId,
      products: orderProducts,
      totalAmount,
      address,
      paymentMethod
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

// Get Orders by User ID
const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate("products.productId", "name price image") // Populate with product details including image
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders by user", error: error.message });
  }
};

// Get Order by Order ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId })
      .populate("products.productId", "name price image") // Populate with product details including image
      .exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order by order ID", error: error.message });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error: error.message });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId", "name price image");
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrdersByUserId,
  getOrderById,
  getOrders,
  updateOrderStatus
};

