import React from 'react';

const AdminOrders = () => {
  // Placeholder for orders data
  const orders = [
    { id: 1, customer: 'John Doe', date: '2025-12-17', status: 'Shipped' },
    { id: 2, customer: 'Jane Smith', date: '2025-12-16', status: 'Processing' },
    { id: 3, customer: 'Bob Johnson', date: '2025-12-15', status: 'Delivered' },
  ];

  return (
    <div className="container admin-orders-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Manage Orders</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
