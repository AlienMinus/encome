import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed, or use fetch

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://encome.onrender.com/api/orders'); // Adjust URL as needed
        setOrders(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="container admin-orders-container">Loading orders...</div>;
  }

  if (error) {
    return <div className="container admin-orders-container text-danger">Error: {error.message}</div>;
  }

  return (
    <div className="container admin-orders-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Manage Orders</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Email</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment Method</th>
            <th>Shipping Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderId}</td>
              <td>{order.userEmail}</td>
              <td>{order.date}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.paymentMethod}</td>
              <td>
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}, {order.shippingAddress.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
