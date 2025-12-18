import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <p>Welcome to the Admin Dashboard!</p>
      {/* Admin content will go here */}
      <nav className="admin-nav">
        <ul>
          <li><Link to="/admin/products">Manage Products</Link></li>
          <li><Link to="/admin/orders">Manage Orders</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
          {/* Add more admin links as needed */}
        </ul>
      </nav>
      <div className="admin-content">
        {/* This area will display different admin sections based on navigation */}
        <p>Select an option from the navigation to manage content.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
