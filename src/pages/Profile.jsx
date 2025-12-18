import React, { useState } from "react";
import {
  FaEdit,
  FaKey,
} from "react-icons/fa";
import "../App.css";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "123-456-7890",
    profilePicture: "",
    addresses: [
      {
        line: "123 Main St",
        type: "Home",
      },
    ],
  });

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return (
        nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
      ).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <EditProfile user={user} onSave={setUser} />
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card profile-card">
              <div className="card-header text-center">
                <h2>User Profile</h2>
              </div>
              <div className="card-body">
                <div className="profile-picture-container">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="rounded-circle"
                      width="150"
                      height="150"
                    />
                  ) : (
                    <div className="profile-initials-circle">
                      <span className="profile-initials">
                        {getInitials(user.name)}
                      </span>
                    </div>
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
                      <div>
                          <div className="mb-2">
                            <strong>Address Line:</strong> {address.line}
                          </div>

                          <div className="mb-2">
                            <strong>Type:</strong> {address.type}
                          </div>
                        </div>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-end">
                  <button 
                    className="btn btn-outline-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editProfileModal"
                  >
                    <FaEdit className="me-1" /> Edit Profile
                  </button>
                  <button 
                    className="btn btn-outline-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#passwordResetModal"
                  >
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
