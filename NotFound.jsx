import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.message}>Page Not Found</h2>
      <p style={styles.description}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" style={styles.homeButton}>
        Back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  errorCode: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#dc3545', // Red color for error
    margin: '0',
  },
  message: {
    fontSize: '2rem',
    margin: '10px 0 20px',
    color: '#333',
  },
  description: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '30px',
    maxWidth: '500px',
  },
  homeButton: {
    padding: '12px 24px',
    backgroundColor: '#ff0077ff',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
};

export default NotFound;