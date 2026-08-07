const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Windows querySrv ECONNREFUSED issue with Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  // Safe fallback if environment restricts setting custom DNS
}

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopez';
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    if (uri !== 'mongodb://127.0.0.1:27017/shopez') {
      try {
        console.log('Attempting local MongoDB connection at mongodb://127.0.0.1:27017/shopez...');
        const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/shopez', { serverSelectionTimeoutMS: 3000 });
        console.log(`[MongoDB Connected Locally]: ${localConn.connection.host}`);
        return;
      } catch (localErr) {
        console.error(`[Local MongoDB Connection Error]: ${localErr.message}`);
      }
    }
    console.log('App will continue running. Ensure MongoDB service is running on mongodb://127.0.0.1:27017/shopez');
  }
};

module.exports = connectDB;
