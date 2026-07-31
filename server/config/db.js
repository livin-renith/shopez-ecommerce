const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Windows querySrv ECONNREFUSED issue with Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  // Safe fallback if environment restricts setting custom DNS
}

const connectDB = async () => {

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopez');
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Fallback gracefully so server doesn't crash in offline preview mode
    console.log('App will continue running. Ensure MongoDB service is running on mongodb://127.0.0.1:27017/shopez');
  }
};

module.exports = connectDB;
