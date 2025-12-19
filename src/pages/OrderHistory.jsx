import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../App.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Use the useAuth hook

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                setError("You must be logged in to view your order history.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://encome.onrender.com/api/orders/history', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Sort orders by date in descending order
                    const sortedOrders = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setOrders(sortedOrders);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Failed to fetch order history.');
                }
            } catch (error) {
                setError('An error occurred while fetching your order history.');
                console.error('Error fetching order history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [user]); // Re-fetch if the user changes

    if (loading) {
        return <div className="container"><p>Loading order history...</p></div>;
    }

    if (error) {
        return <div className="container"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className="container order-history-container">
            <h1>Order History</h1>

            {orders.length === 0 ? (
                <p>You have no past orders.</p>
            ) : (
                <div className="order-list">
                    {orders.map(order => (
                        <div key={order.orderId} className="order-card">
                            <div className="order-header">
                                <h3>Order #{order.orderId}</h3>
                                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="order-body">
                                <ul className="item-list-history">
                                    {order.items.map((item, index) => (
                                        <li key={item._id || index}>
                                            <span>{item.name} (x{item.quantity})</span>
                                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="order-footer">
                                    <p>
                                        <strong>Payment Method:</strong> {order.paymentMethod}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {order.status}
                                    </p>
                                    <p>
                                        <strong>Total:</strong> ${order.total.toFixed(2)}
                                    </p>
                                    <Link to={`/order-receipt/${order.orderId}`} className="btn btn-primary-custom">
                                        View Receipt
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
