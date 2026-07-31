const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health & Root route
app.get('/', (req, res) => {
  res.json({
    message: 'ShopEZ E-Commerce API Service is operational',
    version: '1.0.0',
    adminLogin: 'admin@gmail.com / admin123',
    status: 'Healthy',
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Requested API endpoint not found' });
});

// Global Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 ShopEZ Backend Server running on port: ${PORT}`);
  console.log(`👉 API Base URL: http://localhost:${PORT}`);
  console.log(`🔑 Admin Login: admin@gmail.com | Password: admin123`);
  console.log(`====================================================`);
});
