const mongoose = require('mongoose');
const Product = require('./models/product');

const products = [
  { idno: 1, title: 'Dress', price: 'Rs.1500', imageUrl: 'path/to/img1.jpg' },
  { idno: 2, title: 'Kurtha', price: 'Rs.1000', imageUrl: 'path/to/img2.jpg' },
  { idno: 3, title: 'Shooe', price: 'Rs.2000', imageUrl: 'path/to/img3.jpg' },
  // Add other products
];

mongoose
  .connect('mongodb://127.0.0.1:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.insertMany(products);
    console.log('Product data seeded');
    mongoose.connection.close();
  })
  .catch((err) => console.log('Error seeding data:', err));
