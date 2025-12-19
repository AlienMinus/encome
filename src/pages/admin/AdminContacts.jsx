import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaTrash } from 'react-icons/fa'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = getToken();
        const response = await axios.get('https://encome.onrender.com/api/contacts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContacts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [getToken]);

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        const token = getToken();
        await axios.delete(`https://encome.onrender.com/api/contacts/${contactId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContacts(contacts.filter(contact => contact._id !== contactId));
      } catch (err) {
        console.error("Failed to delete contact:", err);
        // Optionally show an error message to the user
      }
    }
  };

  if (loading) {
    return <div className="container admin-contacts-container">Loading contacts...</div>;
  }

  if (error) {
    return <div className="container admin-contacts-container text-danger">Error: {error.message}</div>;
  }

  return (
    <div className="container admin-contacts-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Contact Messages</h1>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(contact._id)} className="btn btn-danger btn-sm">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContacts;