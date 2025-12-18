// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState(null); // Add username state

  useEffect(() => {
    // Check localStorage for a token and username on initial load
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const login = (token, user) => { // Accept user parameter
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', user); // Store username
    setIsLoggedIn(true);
    setAuthToken(token);
    setUsername(user); // Set username state
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username'); // Remove username
    setIsLoggedIn(false);
    setAuthToken(null);
    setUsername(null); // Clear username state
  };

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, username, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
