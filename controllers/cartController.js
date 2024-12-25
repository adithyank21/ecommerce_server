




const Cart = require('../models/cart');

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the product already exists in the user's cart
    const existingProduct = await Cart.findOne({ userId, productId });

    if (existingProduct) {
      // Update the quantity if the product already exists
      existingProduct.quantity += quantity;
      await existingProduct.save();
      return res.status(200).json({ message: 'Product quantity updated', cart: existingProduct });
    }

    // If the product doesn't exist, create a new cart item
    const newCartItem = new Cart({ userId, productId, quantity });
    await newCartItem.save();

    res.status(201).json({ message: 'Product added to cart', cart: newCartItem });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Error adding product to cart' });
  }
};

// Fetch cart items for a specific user
const getCart = async (req, res) => {
  const { userId } = req.query; // Expecting userId as a query parameter

  try {
    const cartItems = await Cart.find({ userId }).populate('productId');
    if (!cartItems.length) {
      return res.status(200).json({ message: 'Cart is empty', products: [] });
    }
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  const { id } = req.params; // Cart item ID

  try {
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await Cart.deleteOne({ _id: id });
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Error removing product from cart' });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
