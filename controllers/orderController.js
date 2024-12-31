


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

