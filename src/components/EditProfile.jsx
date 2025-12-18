import React, { useState, useEffect } from 'react';
import { FaPlus, FaSave, FaTrash } from 'react-icons/fa';

const EditProfile = ({ user, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
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
    updatedAddresses[index][name] = value;
    setEditedUser((prevUser) => ({
      ...prevUser,
      addresses: updatedAddresses,
    }));
  };

  const handleAddAddress = () => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      addresses: [...prevUser.addresses, { line: '', type: '' }],
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
              <input type="email" className="form-control" id="email" name="email" value={editedUser.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact No.</label>
              <input type="text" className="form-control" id="contact" name="contact" value={editedUser.contact} onChange={handleChange} />
            </div>
            <hr />
            <h5>Addresses</h5>
            {editedUser.addresses.map((address, index) => (
              <div key={index} className="row mb-2 align-items-center">
                <div className="col-12 col-sm-5 mb-2 mb-sm-0">
                  <input
                    type="text"
                    name="line"
                    value={address.line}
                    onChange={(e) => handleAddressChange(e, index)}
                    className="form-control"
                    placeholder="Address Line"
                  />
                </div>
                <div className="col-12 col-sm-4 mb-2 mb-sm-0">
                  <input
                    type="text"
                    name="type"
                    value={address.type}
                    onChange={(e) => handleAddressChange(e, index)}
                    className="form-control"
                    placeholder="Type (e.g., Home, Work)"
                  />
                </div>
                <div className="col-12 col-sm-2 d-flex justify-content-end">
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteAddress(index)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button className="btn btn-outline-success btn-sm" onClick={handleAddAddress}>
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
