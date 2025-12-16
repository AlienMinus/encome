import React, { useState } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaKey,
  FaPlus,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import "../App.css";
const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "123-456-7890",
    profilePicture: "",
    addresses: [
      {
        line1: "123 Main St",
        line2: "Apt 4B",
        type: "Home",
      },
    ],
  });

  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [editedAddress, setEditedAddress] = useState(null);

  const handleAddAddress = () => {
    const newAddress = { line1: "", line2: "", type: "" };
    setUser((prevUser) => ({
      ...prevUser,
      addresses: [...prevUser.addresses, newAddress],
    }));
    setEditingAddressIndex(user.addresses.length);
    setEditedAddress(newAddress);
  };

  const handleEditAddress = (index) => {
    setEditingAddressIndex(index);
    setEditedAddress({ ...user.addresses[index] });
  };

  const handleDeleteAddress = (index) => {
    setUser((prevUser) => ({
      ...prevUser,
      addresses: prevUser.addresses.filter((_, i) => i !== index),
    }));
  };

  const handleSaveAddress = (index) => {
    const isAddressTypeTaken = user.addresses.some(
      (address, i) => i !== index && address.type === editedAddress.type
    );

    if (isAddressTypeTaken) {
      alert("Address type already exists. Please choose a different type.");
      return;
    }

    const updatedAddresses = [...user.addresses];
    updatedAddresses[index] = editedAddress;
    setUser((prevUser) => ({
      ...prevUser,
      addresses: updatedAddresses,
    }));
    setEditingAddressIndex(null);
    setEditedAddress(null);
  };

  const handleCancelEdit = () => {
    if (
      editedAddress.line1 === "" &&
      editedAddress.line2 === "" &&
      editedAddress.type === ""
    ) {
      handleDeleteAddress(editingAddressIndex);
    }
    setEditingAddressIndex(null);
    setEditedAddress(null);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card profile-card">
              <div className="card-header text-center">
                <h2>User Profile</h2>
              </div>
              <div className="card-body">
                <div className="text-center mb-4">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="rounded-circle"
                      width="150"
                      height="150"
                    />
                  ) : (
                    <FaUserCircle size={150} className="text-secondary" />
                  )}
                </div>
                <div className="mb-3">
                  <strong>Name:</strong> {user.name}
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="mb-3">
                  <strong>Contact No.:</strong> {user.contact}
                </div>
                <hr />
                <h5>Addresses</h5>
                {user.addresses.map((address, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      {editingAddressIndex === index ? (
                        <div>
                          <div className="mb-2">
                            <strong>Address Line 1:</strong>
                            <input
                              type="text"
                              name="line1"
                              value={editedAddress.line1}
                              onChange={handleAddressChange}
                              className="form-control"
                            />
                          </div>
                          <div className="mb-2">
                            <strong>Address Line 2:</strong>
                            <input
                              type="text"
                              name="line2"
                              value={editedAddress.line2}
                              onChange={handleAddressChange}
                              className="form-control"
                            />
                          </div>
                          <div className="mb-2">
                            <strong>Type:</strong>
                            <input
                              type="text"
                              name="type"
                              value={editedAddress.type}
                              onChange={handleAddressChange}
                              className="form-control"
                            />
                          </div>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-sm btn-outline-success me-2"
                              onClick={() => handleSaveAddress(index)}
                            >
                              <FaSave className="me-1" /> Save
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={handleCancelEdit}
                            >
                              <FaTimes className="me-1" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-2">
                            <strong>Address Line 1:</strong> {address.line1}
                          </div>
                          <div className="mb-2">
                            <strong>Address Line 2:</strong> {address.line2}
                          </div>
                          <div className="mb-2">
                            <strong>Type:</strong> {address.type}
                          </div>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEditAddress(index)}
                            >
                              <FaEdit className="me-1" /> Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteAddress(index)}
                            >
                              <FaTrash className="me-1" /> Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-end mb-3">
                  <button
                    className="btn btn-outline-success"
                    onClick={handleAddAddress}
                    disabled={editingAddressIndex !== null}
                  >
                    <FaPlus className="me-1" /> Add New Address
                  </button>
                </div>
                <hr />
                <div className="d-flex justify-content-end">
                  <button className="btn btn-outline-primary me-2">
                    <FaEdit className="me-1" /> Edit Profile
                  </button>
                  <button className="btn btn-outline-secondary">
                    <FaKey className="me-1" /> Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
