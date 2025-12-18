import React, { useState } from 'react';
import '../App.css';
import { useAuth } from '../context/AuthContext';

export default function PasswordReset() {
  const { getToken } = useAuth();
  const [formData, setFormData] = useState({
    lastPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match.");
      return;
    }
    
    const token = getToken();

    fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        lastPassword: formData.lastPassword,
        newPassword: formData.newPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Password reset successful!');
          const passwordResetModal = window.bootstrap.Modal.getInstance(document.getElementById('passwordResetModal'));
          if (passwordResetModal) {
            setTimeout(() => {
              passwordResetModal.hide();
            }, 50);
          }
        } else {
          alert('Password reset failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during password reset.');
      });
  };

  return (
    <div className="modal fade" id="passwordResetModal" tabIndex="-1" aria-labelledby="passwordResetModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="passwordResetModalLabel">Reset Password</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="lastPassword" className="form-label">Last password you remember</label>
                <input type="password" className="form-control" id="lastPassword" name="lastPassword" value={formData.lastPassword} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input type="password" className="form-control" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary-custom">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
