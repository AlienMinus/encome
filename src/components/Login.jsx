import React, { useState, useEffect } from 'react';
import '../App.css';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., send data to an API)
    console.log('Login Data:', formData);

    fetch('https://encome.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Login successful!');
          login(data.token); // Use the login function from AuthContext
          // Close the modal
          const loginModal = window.bootstrap.Modal.getInstance(document.getElementById('loginModal'));
          if (loginModal) {
            setTimeout(() => {
              loginModal.hide();
            }, 50); // Small delay to allow state update and re-render
          }
        } else {
          alert('Login failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during login.');
      });
  };


  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="loginEmail" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginPassword" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-login">Login</button>
              <p className="mt-3">
                Don't have an account? <a href="#registrationModal" data-bs-toggle="modal" data-bs-dismiss="modal">Register here</a>.
              </p>
              <p className="mt-2">
                <a href="#passwordResetModal" data-bs-toggle="modal" data-bs-dismiss="modal">Forgot Password?</a>
              </p>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
