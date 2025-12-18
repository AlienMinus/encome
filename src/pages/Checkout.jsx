import React, { useContext, useState } from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }

        const generateOrderId = () => {
            const now = new Date();
            const date = now.toISOString().slice(0, 10).replace(/-/g, '');
            const time = now.toTimeString().slice(0, 8).replace(/:/g, '');

            let orderNumberOfTheDay = 1;
            const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};

            if (orderHistory[date]) {
                orderNumberOfTheDay = orderHistory[date] + 1;
            }

            orderHistory[date] = orderNumberOfTheDay;
            localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

            return `${date}${time}${orderNumberOfTheDay}`;
        };

        // Generate a mock order ID
        const orderId = generateOrderId();
        const orderDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const orderDetails = {
            orderId,
            date: orderDate,
            items: cartItems.map(item => ({
                _id: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            total: getCartTotal(),
            shippingAddress: shippingInfo,
            paymentMethod: paymentMethod,
        };

        // In a real app, you would send this to a backend API
        console.log('Placing Order:', orderDetails);

        // Store order in local storage for OrderHistory page (mock persistence)
        const pastOrders = JSON.parse(localStorage.getItem('pastOrders')) || [];
        localStorage.setItem('pastOrders', JSON.stringify([...pastOrders, orderDetails]));

        clearCart(); // Clear the cart after placing the order

        navigate('/order-receipt', { state: { orderDetails } });
    };

    return (
        <div className="container checkout-container">
            <h1>Checkout</h1>

            <div className="order-summary-checkout">
                <h2>Your Order</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="item-list-checkout">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>${(item.quantity * item.price).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="total-checkout">
                            <strong>Total:</strong> ${getCartTotal().toFixed(2)}
                        </div>
                    </>
                )}
            </div>

            <form onSubmit={handlePlaceOrder} className="checkout-form">
                <h2>Shipping Information</h2>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="street">Street Address</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={shippingInfo.street}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State/Province</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zip">Zip/Postal Code</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        required
                    />
                </div>

                <h2>Payment Information</h2>
                <div className="form-group">
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Credit Card"
                                checked={paymentMethod === 'Credit Card'}
                                onChange={handlePaymentChange}
                            />
                            Credit Card
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={handlePaymentChange}
                            />
                            PayPal
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Cash on Delivery"
                                checked={paymentMethod === 'Cash on Delivery'}
                                onChange={handlePaymentChange}
                            />
                            Cash on Delivery
                        </label>
                    </div>
                </div>

                <button type="submit" className="place-order-button">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;