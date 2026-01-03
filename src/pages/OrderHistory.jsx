import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth(); // Use the useAuth hook

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const token = localStorage.getItem("authToken");

            if (user && token) {
                try {
                    const response = await axios.get('https://encome.onrender.com/api/orders/history', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const sortedOrders = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setOrders(sortedOrders);
                } catch (error) {
                    console.error('Error fetching order history:', error);
                }
            } else {
                const guestOrderIds = JSON.parse(localStorage.getItem("guestOrderIds") || "[]");
                if (guestOrderIds.length > 0) {
                    try {
                        const requests = guestOrderIds.map(id =>
                            axios.get(`https://encome.onrender.com/api/orders/${id}`)
                                .then(res => res.data)
                                .catch(err => null)
                        );
                        const results = await Promise.all(requests);
                        const validOrders = results.filter(order => order !== null);
                        const sortedOrders = validOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
                        setOrders(sortedOrders);
                    } catch (error) {
                        console.error('Error fetching guest order history:', error);
                    }
                } else {
                    setOrders([]);
                }
            }
        };

        fetchOrderHistory();
    }, [user]); // Re-fetch if the user changes

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
