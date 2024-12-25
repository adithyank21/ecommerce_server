

const multer = require('multer');
const path = require('path');

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/'); // Save uploaded files in uploads/products/
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique name for each file
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .png, or .jpg files are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Max file size: 2MB
  fileFilter,
});

module.exports = upload;
