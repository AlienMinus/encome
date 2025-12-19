import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container admin-dashboard-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <p>Welcome to the Admin Dashboard!</p>
      <div className="row justify-content-center d-flex align-items-stretch">
        <div className="col-md-6 mb-4">
          <div className="card admin-card">
            <div className="card-body">
              <h5 className="card-title">Manage Products</h5>
              <p className="card-text">Add, edit, and delete products.</p>
              <Link to="/admin/products" className="btn btn-primary-custom">Go to Products</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card admin-card">
            <div className="card-body">
              <h5 className="card-title">Manage Orders</h5>
              <p className="card-text">View and process customer orders.</p>
              <Link to="/admin/orders" className="btn btn-primary-custom">Go to Orders</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card admin-card">
            <div className="card-body">
              <h5 className="card-title">Manage Contacts</h5>
              <p className="card-text">Manage customer contact information.</p>
              <Link to="/admin/contacts" className="btn btn-primary-custom">Go to Contacts</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
