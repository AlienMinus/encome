import express from 'express';
const router = express.Router();
import Contact from '../models/Contact.js';

// @route   POST api/contact
// @desc    Save contact form submission
// @access  Public
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
