import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  _id: {
    type: String, // Assuming product _id from frontend is a string
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const shippingAddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  date: {
    type: String, // Storing as string for simplicity, can be Date type if needed
    required: true,
    trim: true,
  },
  items: [orderItemSchema],
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true,
  },
  // Optionally, you might want to link the order to a user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Made optional
  },
  // Or simply store the username/email for historical purposes
  userEmail: {
    type: String,
    required: false, // Made optional
    trim: true,
  },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);