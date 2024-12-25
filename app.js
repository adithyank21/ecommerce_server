const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/Routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes')
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRotes')
const registerRoutes = require('./routes/registerRoute')
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes

app.use('/api/auth', authRoutes);
app.use('/payment',paymentRoutes);
app.use("/api/products", productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/', registerRoutes);

// app.use('/images', express.static('/images'));
// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



