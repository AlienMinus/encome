import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://encome.onrender.com/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        setOrders(response.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`https://encome.onrender.com/api/orders/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      setOrders(orders.map(order => order._id === id ? response.data : order));
    } catch (err) {
      console.error("Failed to update order status:", err);
      // Optionally show an error message to the user
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="container admin-orders-container text-danger">Error: {error.message}</div>;
  }

  return (
    <div className="container admin-orders-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Manage Orders</h1>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Email</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.userEmail}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <select 
                    className="form-select" 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </td>
                <td>
                  <Link 
                    to={`/order-receipt/${order.orderId}`} 
                    state={{ orderDetails: order }}
                    className="btn btn-primary-custom btn-sm"
                  >
                    View Receipt
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
