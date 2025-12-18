import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false }); // Do not create _id for subdocuments

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Each user has only one cart
    },
    items: [CartItemSchema]
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);