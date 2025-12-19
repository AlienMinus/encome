import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import User from '../models/User.js'; // Import the User model
import Order from '../models/Order.js'; // Import the Order model
import mongoose from 'mongoose'; // Import mongoose
import adminMiddleware from '../middleware/adminMiddleware.js'; // Import adminMiddleware
import authenticateToken from '../middleware/authMiddleware.js'; // Import authenticateToken middleware

const router = express.Router();

// Products API
router.get('/products', async (req, res) => {
  try {
    const { category, search, minStock } = req.query;

    const filter = {};

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by minimum stock
    if (minStock) {
      filter.stock = { $gte: Number(minStock) };
    }

    // Search by product name (case-insensitive)
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/products', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
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
});


router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/products/:id/images', async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: 'Image URL is required' });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Pull the image URL from the images array
    product.images.pull(imageUrl);

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Categories API
router.get('/categories', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/categories', async (req, res) => {
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/categories/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reviews API
router.get('/reviews/:productId', async (req, res) => {
    try {
      const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.post('/reviews', async (req, res) => {
    const review = new Review(req.body);
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// User Profile API
router.get('/user/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let user;

    // 1️⃣ Mongo ObjectId
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      user = await User.findById(identifier).select('-passwords');
    }
    // 2️⃣ Email
    else if (identifier.includes('@')) {
      user = await User.findOne({ email: identifier }).select('-passwords');
    }
    // 3️⃣ Custom userId (e.g., admin)
    else {
      user = await User.findOne({ userId: identifier }).select('-passwords');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: error.message });
  }
});


router.put('/user/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let updatedUser;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      updatedUser = await User.findByIdAndUpdate(
        identifier,
        req.body,
        { new: true }
      ).select('-passwords');
    } else if (identifier.includes('@')) {
      updatedUser = await User.findOneAndUpdate(
        { email: identifier },
        req.body,
        { new: true }
      ).select('-passwords');
    } else {
      updatedUser = await User.findOneAndUpdate(
        { userId: identifier },
        req.body,
        { new: true }
      ).select('-passwords');
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: error.message });
  }
});


// Orders API
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email'); // Optionally populate user details
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/orders', authenticateToken, async (req, res) => {
  const { orderId, date, items, total, shippingAddress, paymentMethod } = req.body;

  let userId = null;
  let userEmail = null;

  if (req.user) {
    userId = req.user._id;
    userEmail = req.user.email;
  } else {
    // Guest user
    if (!shippingAddress || !shippingAddress.email) {
      return res.status(400).json({ message: 'Guest checkout requires an email in shipping address.' });
    }
    userEmail = shippingAddress.email;
  }

  // Basic validation
  if (!orderId || !date || !items || items.length === 0 || !total || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: 'Missing required order fields.' });
  }

  try {
    const newOrder = new Order({
      orderId,
      date,
      items,
      total,
      shippingAddress,
      paymentMethod,
      userId,        // Will be null for guest users
      userEmail,     // Will be from req.user.email or shippingAddress.email
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/orders/history', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authorization required.' });
  }
  try {
    const orders = await Order.find({ userEmail: req.user.email });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/orders/:orderId/status', adminMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required.' });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




export default router;