const Product = require('../models/Product');

// @desc    Get all products with filtering & search
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, gender, search, sort } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (gender && gender !== 'All') {
      query.gender = gender;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') {
      sortOptions = { price: 1 };
    } else if (sort === 'price-high') {
      sortOptions = { price: -1 };
    } else if (sort === 'rating') {
      sortOptions = { rating: -1 };
    }

    const products = await Product.find(query).sort(sortOptions);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { title, description, mainImg, carousel, category, gender, sizes, price, discount, stock } = req.body;

    const product = new Product({
      title,
      description,
      mainImg: mainImg || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      carousel: carousel || [],
      category: category || 'Electronics',
      gender: gender || 'Unisex',
      sizes: sizes || ['S', 'M', 'L', 'XL'],
      price,
      discount: discount || 0,
      stock: stock !== undefined ? stock : 50,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = req.body.title || product.title;
      product.description = req.body.description || product.description;
      product.mainImg = req.body.mainImg || product.mainImg;
      product.carousel = req.body.carousel || product.carousel;
      product.category = req.body.category || product.category;
      product.gender = req.body.gender || product.gender;
      product.sizes = req.body.sizes || product.sizes;
      product.price = req.body.price !== undefined ? req.body.price : product.price;
      product.discount = req.body.discount !== undefined ? req.body.discount : product.discount;
      product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
