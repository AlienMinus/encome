import React, { useState, useEffect } from 'react';

import '../App.css';

export default function Registration() {
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const storedFormData = localStorage.getItem('registrationFormData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Registration successful!');
          localStorage.setItem('registrationFormData', JSON.stringify(formData));
          window.location.href = '#loginModal';
        } else {
          alert('Registration failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      });

    // Handle registration logic here (e.g., send data to an API)
    console.log('Registration Data:', formData);
    localStorage.setItem('registrationFormData', JSON.stringify(formData));
    // You might want to close the modal or show a success message here
    window.location.href = '#loginModal'; // Redirect to login modal after successful registration
  };

  return (
    <div className="modal fade" id="registrationModal" tabIndex="-1" aria-labelledby="registrationModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="registrationModalLabel">Register</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="registrationUserId" className="form-label">User ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="registrationUserId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registrationEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="registrationEmail" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="registrationPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="registrationPassword" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-register">Register</button>
              <p className="mt-3">
                Already have an account? <a href="#loginModal" data-bs-toggle="modal" data-bs-dismiss="modal">Login Now</a>.
              </p>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}