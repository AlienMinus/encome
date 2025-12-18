import React, { useState, useEffect } from "react";
import { FaEdit, FaKey } from "react-icons/fa";
import "../App.css";
import EditProfile from "../components/EditProfile";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Profile = () => {
  const { username, authToken } = useAuth(); // Get username (which we're assuming is userId) and authToken
  const [user, setUser] = useState(null); // Initialize user as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true); // Ensure loading state is true on retry or initial fetch
      setError(null); // Clear any previous errors

      if (!username || !authToken) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      const apiUrl = `https://encome.onrender.com/api/user/${encodeURIComponent(username)}`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 404) {
          setError("User profile not found. It might have been deleted or there's an issue with your account. Please try logging out and logging back in.");
          // Optionally, force logout here if a 404 on profile is considered critical
          // logout();
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (e) {
        setError("Failed to fetch user profile: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username, authToken]); // Re-run when username or authToken changes

  const handleProfileSave = async (updatedUser) => {
    if (!username || !authToken) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await fetch(`https://encome.onrender.com/api/user/${encodeURIComponent(username)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUser(data); // Update local state with the new data from the server
      alert("Profile updated successfully!");
    } catch (e) {
      setError("Failed to update user profile: " + e.message);
      alert("Error updating profile. Please try again.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return (
        nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
      ).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-center text-danger">{error}</div>;
  }

  if (!user) {
    return <div className="container mt-5 text-center">No user data found.</div>;
  }

  return (
    <>
      <EditProfile user={user} onSave={handleProfileSave} /> {/* Pass handleProfileSave */}
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
                {user.addresses && user.addresses.length > 0 ? (
                  user.addresses.map((address, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <div>
                          <div className="mb-2">
                            <strong>Street:</strong> {address.street}
                          </div>
                          <div className="mb-2">
                            <strong>City:</strong> {address.city}
                          </div>
                          <div className="mb-2">
                            <strong>State/Province:</strong> {address.state}
                          </div>
                          <div className="mb-2">
                            <strong>Zip/Postal Code:</strong> {address.zip}
                          </div>
                          <div className="mb-2">
                            <strong>Country:</strong> {address.country}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No addresses found.</p>
                )}
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
