const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, notes } = req.body;
    
    // Validate and calculate order items
    const orderItems = [];
    let subtotal = 0;
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({
          success: false,
          error: `Product not found: ${item.productId}`
        });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          error: `Insufficient stock for ${product.name}`
        });
      }
      
      const itemTotal = product.price * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      });
      
      subtotal += itemTotal;
    }
    
    // Create order
    const order = new Order({
      customer,
      items: orderItems,
      subtotal,
      notes
    });
    
    await order.save();
    
    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }
    
    // Update or create customer
    let customerDoc = await Customer.findOne({ email: customer.email });
    if (customerDoc) {
      customerDoc.totalOrders += 1;
      customerDoc.totalSpent += order.total;
      customerDoc.orders.push(order._id);
      await customerDoc.save();
    } else {
      customerDoc = new Customer({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        addresses: [{
          address: customer.address,
          isDefault: true
        }],
        orders: [order._id],
        totalOrders: 1,
        totalSpent: order.total
      });
      await customerDoc.save();
    }
    
    // Populate order for response
    await order.populate('items.product');
    
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/orders - Get all orders (Admin)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    
    let query = {};
    if (status) query.status = status;
    
    const orders = await Order.find(query)
      .populate('items.product')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Order.countDocuments(query);
    
    res.json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    
    const updateData = { status };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (status === 'delivered') updateData.deliveredAt = new Date();
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('items.product');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    // TODO: Send notification to customer about status update
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/orders/customer/:email - Get customer orders
router.get('/customer/:email', async (req, res) => {
  try {
    const orders = await Order.find({ 'customer.email': req.params.email })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;