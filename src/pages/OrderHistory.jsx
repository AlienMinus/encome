import React, { useEffect, useState } from 'react';
import '../App.css';

const OrderHistory = () => {
    const [pastOrders, setPastOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('pastOrders')) || [];
        setPastOrders([...storedOrders].reverse());
    }, []);

    return (
        <div className="container order-history-container">
            <h1>Order History</h1>

            {pastOrders.length === 0 ? (
                <p>You have no past orders.</p>
            ) : (
                <div className="order-list">
                    {pastOrders.map(order => (
                        <div key={order.orderId} className="order-card">
                            <div className="order-header">
                                <h3>Order #{order.orderId}</h3>
                                <p>Date: {order.date}</p>
                            </div>
                            <div className="order-body">
                                <ul className="item-list-history">
                                    {order.items.map(item => (
                                        <li key={item.id}>
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
                                        <strong>Total:</strong> ${order.total.toFixed(2)}
                                    </p>
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
