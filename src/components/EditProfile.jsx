import React, { useState, useEffect } from 'react';
import { FaPlus, FaSave, FaTrash } from 'react-icons/fa';

const EditProfile = ({ user, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    if (user && user.addresses) {
      setEditedUser({
        ...user,
        addresses: user.addresses.map(address => ({
          street: address.street || '',
          city: address.city || '',
          state: address.state || '',
          zip: address.zip || '',
          country: address.country || '',
        })),
      });
    } else {
      setEditedUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAddresses = [...editedUser.addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [name]: value,
    };
    setEditedUser((prevUser) => ({
      ...prevUser,
      addresses: updatedAddresses,
    }));
  };

  const handleAddAddress = () => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      addresses: [...prevUser.addresses, { street: '', city: '', state: '', zip: '', country: '' }],
    }));
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = editedUser.addresses.filter((_, i) => i !== index);
    setEditedUser((prevUser) => ({
      ...prevUser,
      addresses: updatedAddresses,
    }));
  };

  const handleSaveChanges = () => {
    onSave(editedUser);
    const editProfileModal = window.bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
    if (editProfileModal) {
      editProfileModal.hide();
    }
  };

  return (
    <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProfileModalLabel">Edit Profile</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={editedUser.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={editedUser.email} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact No.</label>
              <input type="text" className="form-control" id="contact" name="contact" value={editedUser.contact} onChange={handleChange} />
            </div>
            <hr />
            <h5>Addresses</h5>
            {editedUser.addresses.map((address, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <h6 className="mb-3">Address {index + 1}</h6>
                <div className="form-group mb-3">
                  <label htmlFor={`street-${index}`} className="form-label">Street Address</label>
                  <input
                    type="text"
                    id={`street-${index}`}
                    name="street"
                    value={address.street}
                    onChange={(e) => handleAddressChange(e, index)}
                    className="form-control"
                    placeholder="Street Address"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor={`city-${index}`} className="form-label">City</label>
                  <input
                    type="text"
                    id={`city-${index}`}
                    name="city"
                    value={address.city}
                    onChange={(e) => handleAddressChange(e, index)}
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor={`state-${index}`} className="form-label">State/Province</label>
                  <input
                    type="text"
                    id={`state-${index}`}
                    name="state"
                    value={address.state}
                    onChange={(e) => handleAddressChange(e, index)}
                    className="form-control"
                    placeholder="State/Province"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor={`zip-${index}`} className="form-label">Zip/Postal Code</label>
                  <input
                    type="text"
                    id={`zip-${index}`}
                    name="zip"
                    value={address.zip}
                    onChange={(e) => handleAddressChange(e, index)}
                    className="form-control"
                    placeholder="Zip/Postal Code"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor={`country-${index}`} className="form-label">Country</label>
                  <input
                    type="text"
                    id={`country-${index}`}
                    name="country"
                    value={address.country}
                    onChange={(e) => handleAddressChange(e, index)}
                    className="form-control"
                    placeholder="Country"
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteAddress(index)}>
                    <FaTrash /> Remove Address
                  </button>
                </div>
              </div>
            ))}
            <button className="btn btn-outline-success" onClick={handleAddAddress}>
              <FaPlus className="me-1" /> Add New Address
            </button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary-custom" onClick={handleSaveChanges}>
              <FaSave className="me-1" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
