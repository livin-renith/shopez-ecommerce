const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  title: String,
  mainImg: String,
  price: Number,
  discount: Number,
  size: String,
  quantity: Number,
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: String,
    email: String,
    mobile: String,
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Card', 'UPI'],
      default: 'COD',
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Placed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
