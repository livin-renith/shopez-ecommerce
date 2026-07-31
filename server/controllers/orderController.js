const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create a new order (Checkout / Shop Now)
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { name, email, mobile, address, pincode, paymentMethod, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items specified' });
    }

    if (!address || !pincode) {
      return res.status(400).json({ message: 'Shipping address and pincode are required' });
    }

    const orderItems = items.map((item) => ({
      product: item.product || item._id,
      title: item.title,
      mainImg: item.mainImg,
      price: item.price,
      discount: item.discount || 0,
      size: item.size || 'M',
      quantity: item.quantity || 1,
    }));

    const order = new Order({
      userId: req.user._id,
      name: name || req.user.name,
      email: email || req.user.email,
      mobile: mobile || req.user.mobile,
      address,
      pincode,
      paymentMethod: paymentMethod || 'COD',
      items: orderItems,
      totalAmount,
      status: 'Placed',
    });

    const createdOrder = await order.save();

    // Clear cart after successful order creation
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user's order history
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order details by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check ownership or admin status
    if (order.userId.toString() !== req.user._id.toString() && req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin or User cancellation)
// @route   PUT /api/orders/:id/status
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};
