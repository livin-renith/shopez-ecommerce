const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    mainImg: {
      type: String,
      default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    },
    carousel: [{ type: String }],
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Kids', 'Unisex'],
      default: 'Unisex',
    },
    sizes: [{ type: String }],
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 50,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewCount: {
      type: Number,
      default: 124,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
