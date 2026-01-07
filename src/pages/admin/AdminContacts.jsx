import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaTrash } from 'react-icons/fa'
import Loading from '../../components/Loading';

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
        console.error(err);
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
    return <Loading />;
  }

  if (error) {
    return <div className="container admin-contacts-container text-danger">Error: {error.message}</div>;
  }

  return (
    <div className="container admin-contacts-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Contact Messages</h1>
      </div>
      <div className="row mt-3">
        {contacts.map((contact) => (
          <div key={contact._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{contact.name}</h5>
                  <small className="text-muted">{new Date(contact.createdAt).toLocaleDateString()}</small>
                </div>
                <h6 className="card-subtitle mb-3 text-muted">{contact.email}</h6>
                <p className="card-text flex-grow-1">{contact.message}</p>
                <div className="text-end">
                  <button onClick={() => handleDelete(contact._id)} className="btn btn-danger btn-sm">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContacts;