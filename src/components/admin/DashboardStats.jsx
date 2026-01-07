import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaBox, FaShoppingCart, FaMoneyBillWave, FaEnvelope } from 'react-icons/fa';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    contacts: 0
  });
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = getToken();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Fetch data in parallel
        const [productsRes, ordersRes, contactsRes] = await Promise.all([
          axios.get('https://encome.onrender.com/api/products'),
          axios.get('https://encome.onrender.com/api/orders', config),
          axios.get('https://encome.onrender.com/api/contacts', config)
        ]);

        const totalRevenue = ordersRes.data.reduce((sum, order) => {
          if (order.status !== 'Cancelled' && order.status !== 'Refunded') {
            return sum + (order.total || 0);
          }
          return sum;
        }, 0);

        setStats({
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          revenue: totalRevenue,
          contacts: contactsRes.data.length
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, [getToken]);

  return (
    <div className="row mb-4">
      <div className="col-md-3 col-sm-6 mb-3">
        <div className="card text-white bg-success h-100 dashboard-stat-card">
          <div className="card-body">
            <div className="position-relative">
              <div>
                <h6 className="card-title mb-0">Total Revenue</h6>
                <h3 className="mt-2 mb-0">₹{stats.revenue.toFixed(2)}</h3>
              </div>
              <FaMoneyBillWave size={40} className="opacity-50 position-absolute top-50 end-0 translate-middle-y" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 mb-3">
        <div className="card text-white bg-primary h-100 dashboard-stat-card">
          <div className="card-body">
            <div className="position-relative">
              <div>
                <h6 className="card-title mb-0">Total Orders</h6>
                <h3 className="mt-2 mb-0">{stats.orders}</h3>
              </div>
              <FaShoppingCart size={40} className="opacity-50 position-absolute top-50 end-0 translate-middle-y" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 mb-3">
        <div className="card text-white bg-warning h-100 dashboard-stat-card">
          <div className="card-body">
            <div className="position-relative">
              <div>
                <h6 className="card-title mb-0">Total Products</h6>
                <h3 className="mt-2 mb-0">{stats.products}</h3>
              </div>
              <FaBox size={40} className="opacity-50 position-absolute top-50 end-0 translate-middle-y" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 mb-3">
        <div className="card text-white bg-info h-100 dashboard-stat-card">
          <div className="card-body">
            <div className="position-relative">
              <div>
                <h6 className="card-title mb-0">Messages</h6>
                <h3 className="mt-2 mb-0">{stats.contacts}</h3>
              </div>
              <FaEnvelope size={40} className="opacity-50 position-absolute top-50 end-0 translate-middle-y" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;