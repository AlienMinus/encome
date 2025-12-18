const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Assuming you have an auth middleware
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @route   GET api/cart
// @desc    Get user cart
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId', 'name price images');
        if (!cart) {
            return res.status(200).json({ items: [] }); // Return an empty cart if not found
        }
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/cart/add
// @desc    Add item to cart or update quantity if exists
// @access  Private
router.post('/add', auth, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        if (cart) {
            // Cart exists for user
            let itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

            if (itemIndex > -1) {
                // Product exists in the cart, update the quantity
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                // Product does not exists in cart, add new item
                cart.items.push({ productId, quantity });
            }
            cart = await cart.save();
            res.json(cart);
        } else {
            // No cart for user, create new cart
            const newCart = new Cart({
                userId: req.user.id,
                items: [{ productId, quantity }]
            });

            const savedCart = await newCart.save();
            res.json(savedCart);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/cart/update/:productId
// @desc    Update quantity of an item in cart
// @access  Private
router.put('/update/:productId', auth, async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        let itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

        if (itemIndex > -1) {
            let productItem = cart.items[itemIndex];
            productItem.quantity = quantity;
            cart.items[itemIndex] = productItem;
            cart = await cart.save();
            res.json(cart);
        } else {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/cart/remove/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:productId', auth, async (req, res) => {
    const { productId } = req.params;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        cart = await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/cart/clear
// @desc    Clear user cart
// @access  Private
router.delete('/clear', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        cart.items = [];
        cart = await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;