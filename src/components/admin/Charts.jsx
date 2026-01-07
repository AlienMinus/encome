import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Charts = () => {
  const [data, setData] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = getToken();
        const response = await axios.get('https://encome.onrender.com/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const orders = response.data;
        const salesMap = new Map();

        orders.forEach(order => {
          if (order.status !== 'Cancelled' && order.status !== 'Refunded') {
            // Use ISO date string (YYYY-MM-DD) as key for sorting
            const dateKey = new Date(order.date).toISOString().split('T')[0];
            
            if (salesMap.has(dateKey)) {
              salesMap.set(dateKey, salesMap.get(dateKey) + order.total);
            } else {
              salesMap.set(dateKey, order.total);
            }
          }
        });

        // Convert map to array, sort by date, and format for display
        const chartData = Array.from(salesMap.entries())
          .sort((a, b) => new Date(a[0]) - new Date(b[0]))
          .map(([date, total]) => ({
            date: new Date(date).toLocaleDateString(),
            amount: parseFloat(total.toFixed(2))
          }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching sales data for chart:", error);
      }
    };

    fetchSalesData();
  }, [getToken]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Sales Overview</h5>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;