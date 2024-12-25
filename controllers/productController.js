// // // // // // // // const Product = require('../models/product');

// // // // // // // // // Fetch all products
// // // // // // // // const getProducts = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const products = await Product.find();
// // // // // // // //     res.status(200).json(products);
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ error: 'Error fetching products' });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // module.exports = { getProducts };


// // // // // // // const Product = require('../models/product');

// // // // // // // // Add a new product
// // // // // // // exports.addProduct = async (req, res) => {
// // // // // // //   const { title, price } = req.body;

// // // // // // //   if (!req.file) {
// // // // // // //     return res.status(400).json({ message: "No image file uploaded" });
// // // // // // //   }

// // // // // // //   const imageUrl = `http://localhost:5001/images/products/${req.file.filename}`;

// // // // // // //   try {
// // // // // // //     const newProduct = new Product({ title, price, imageUrl });
// // // // // // //     const savedProduct = await newProduct.save();
// // // // // // //     res.status(201).json(savedProduct);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: 'Error saving product', error: err });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get all products
// // // // // // // exports.getAllProducts = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const products = await Product.find();
// // // // // // //     res.status(200).json(products);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: 'Error fetching products', error: err });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Seed sample products
// // // // // // // exports.seedProducts = async (req, res) => {
// // // // // // //   const products = [
// // // // // // //     { title: 'Dress', price: 'Rs.1500', imageUrl: 'http://localhost:5001/images/products/img1.jpg' },
// // // // // // //     { title: 'Kurtha', price: 'Rs.1000', imageUrl: 'http://localhost:5001/images/products/img2.jpg' },
// // // // // // //     { title: 'Shoes', price: 'Rs.2000', imageUrl: 'http://localhost:5001/images/products/img3.jpg' },
// // // // // // //   ];

// // // // // // //   try {
// // // // // // //     await Product.deleteMany(); // Clear existing products
// // // // // // //     const seededProducts = await Product.insertMany(products);
// // // // // // //     res.status(201).json(seededProducts);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: 'Error seeding products', error: err });
// // // // // // //   }
// // // // // // // };


// // // // // // const products = require('../models/product');

// // // // // // const getAllProducts = (req, res) => {
// // // // // //   res.status(200).json(products);
// // // // // // };

// // // // // // module.exports = { getAllProducts };


// // // // // // controllers/productController.js
// // // // // const Product = require('../models/product');

// // // // // // Get all products
// // // // // exports.getProducts = async (req, res) => {
// // // // //   try {
// // // // //     const products = await Product.find();
// // // // //     res.json(products);
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // };

// // // // // // Get a single product by ID
// // // // // exports.getProductById = async (req, res) => {
// // // // //   try {
// // // // //     const product = await Product.findById(req.params.id);
// // // // //     if (!product) {
// // // // //       return res.status(404).json({ message: 'Product not found' });
// // // // //     }
// // // // //     res.json(product);
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // };

// // // // const Product = require('../models/product');

// // // // // Get all products
// // // // exports.getProducts = async (req, res) => {
// // // //   try {
// // // //     const products = await Product.find();
// // // //     res.json(products);
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // };

// // // // // Get a single product by ID
// // // // exports.getProductById = async (req, res) => {
// // // //   try {
// // // //     const product = await Product.findById(req.params.id);
// // // //     if (!product) {
// // // //       return res.status(404).json({ message: 'Product not found' });
// // // //     }
// // // //     res.json(product);
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // };

// // // // // Add a product with image
// // // // exports.addProduct = async (req, res) => {
// // // //   const { title, price } = req.body;

// // // //   // If no image is uploaded
// // // //   if (!req.file) {
// // // //     return res.status(400).json({ message: 'No image uploaded' });
// // // //   }

// // // //   const imageUrl = `/images/products/${req.file.filename}`;

// // // //   try {
// // // //     const newProduct = new Product({
// // // //       title,
// // // //       price,
// // // //       imageUrl, // Store image path in the database
// // // //     });

// // // //     await newProduct.save();
// // // //     res.status(201).json({ message: 'Product added successfully!', product: newProduct });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Failed to add product', error: error.message });
// // // //   }
// // // // };


// // // const Product = require('../models/product');

// // // // Get all products
// // // exports.getProducts = async (req, res) => {
// // //   try {
// // //     const products = await Product.find();
// // //     res.status(200).json(products);
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error fetching products', error: error.message });
// // //   }
// // // };

// // // // Get a product by ID
// // // exports.getProductById = async (req, res) => {
// // //   try {
// // //     const product = await Product.findById(req.params.id);
// // //     if (!product) return res.status(404).json({ message: 'Product not found' });
// // //     res.status(200).json(product);
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error fetching product', error: error.message });
// // //   }
// // // };

// // // // Add a new product with image upload
// // // exports.addProduct = async (req, res) => {
// // //   const { title, price, description, category, stock } = req.body;
// // //   const imageUrl = req.file ? req.file.path : null;

// // //   if (!imageUrl) {
// // //     return res.status(400).json({ message: 'Image file is required' });
// // //   }

// // //   try {
// // //     const newProduct = new Product({
// // //       title,
// // //       price,
// // //       description,
// // //       imageUrl,
// // //       category,
// // //       stock,
// // //     });

// // //     await newProduct.save();
// // //     res.status(201).json({ message: 'Product added successfully!', product: newProduct });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error adding product', error: error.message });
// // //   }
// // // };


// // const Product = require('../models/product');

// // // Get all products
// // exports.getProducts = async (req, res) => {
// //   try {
// //     const products = await Product.find();
// //     res.status(200).json(products);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching products', error: error.message });
// //   }
// // };

// // // Get product by ID
// // exports.getProductById = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) return res.status(404).json({ message: 'Product not found' });
// //     res.status(200).json(product);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching product', error: error.message });
// //   }
// // };

// // // Add a new product
// // exports.addProduct = async (req, res) => {
// //   const { title, price, description, category, stock } = req.body;
// //   const imageUrl = req.file ? req.file.path : '';

// //   try {
// //     const newProduct = new Product({
// //       title,
// //       price,
// //       description,
// //       imageUrl,
// //       category,
// //       stock,
// //     });

// //     await newProduct.save();
// //     res.status(201).json({ message: 'Product added successfully!', product: newProduct });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error adding product', error: error.message });
// //   }
// // };


// const Product = require('../models/product');

// exports.addProduct = async (req, res) => {
//   const { title, price, description, category, stock } = req.body;
//   const imageUrl = req.file ? req.file.path : null; // Get the uploaded image's path

//   if (!imageUrl) {
//     return res.status(400).json({ message: 'Image file is required' });
//   }

//   try {
//     const newProduct = new Product({
//       title,
//       price,
//       description,
//       imageUrl, // Save the image URL to the database
//       category,
//       stock,
//     });

//     await newProduct.save();
//     res.status(201).json({ message: 'Product added successfully!', product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding product', error: error.message });
//   }
// };
