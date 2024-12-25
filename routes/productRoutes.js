


// const express = require("express");
// const multer = require("multer");
// const Product = require("../models/product");

// const router = express.Router();

// // Multer for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads"); // Directory to store uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // Add Product Route
// router.post("/add", upload.single("image"), async (req, res) => {
//   try {
//     const { name, price, description } = req.body;
//     const image = req.file ? req.file.path : null;

//     const product = new Product({
//       name,
//       price,
//       description,
//       image,
//     });

//     await product.save();
//     res.status(201).json({ message: "Product added successfully", product });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding product", error });
//   }
// });

// // Get All Products Route
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find(); // Fetch all products from the database
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving products", error });
//   }
// });

// // Edit Product Route
// router.put("/edit/:id", upload.single("image"), async (req, res) => {
//   const productId = req.params.id;
//   try {
//     // Find product by ID
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Update product details
//     const { name, price, description } = req.body;
//     if (name) product.name = name;
//     if (price) product.price = price;
//     if (description) product.description = description;
//     if (req.file) product.image = req.file.path; // If a new image is uploaded

//     await product.save(); // Save updated product to the database
//     res.status(200).json({ message: "Product updated successfully", product });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product", error });
//   }
// });



// const deleteProduct = async (req, res) => {


//   try {
//     const product = await Product.findById(_id);
//     if (!product) {
//       return res.status(404).json({ message: ' item not found' });
//     }

//     await Product.deleteOne({ _id: product });
//     res.status(200).json({ message: ' removed from product' });
//   } catch (error) {
//     console.error('Error removing product from product:', error);
//     res.status(500).json({ error: 'Error removing product from product' });
//   }
// };
// router.delete('/:id', deleteProduct);





// module.exports = router;


const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Product = require("../models/product");

const router = express.Router();

// Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Add Product Route
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.path : null;

    const product = new Product({
      name,
      price,
      description,
      image,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

// Get All Products Route
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
});

// Edit Product Route
router.put("/edit/:id", upload.single("image"), async (req, res) => {
  const productId = req.params.id;
  try {
    // Find product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product details
    const { name, price, description } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (req.file) product.image = req.file.path; // If a new image is uploaded

    await product.save(); // Save updated product to the database
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// Delete Product Route
const deleteProduct = async (req, res) => {
  const productId = req.params.id; // Get the product ID from the request parameters

  try {
    const product = await Product.findById(productId); // Find the product by ID

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional: Delete associated image file
    if (product.image) {
      fs.unlink(product.image, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });
    }

    // Delete product from the database
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Error removing product", error });
  }
};

router.delete("/delete/:id", deleteProduct);

module.exports = router;

