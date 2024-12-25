



const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

// Add a product to the cart
router.post('/', addToCart);

// Get all items in the cart for a specific user
router.get('/', getCart);

// Remove a product from the cart
router.delete('/:id', removeFromCart);

module.exports = router;


