// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Check localStorage for a token on initial load
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setAuthToken(null);
  };

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
