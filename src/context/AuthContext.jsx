// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null); // Add userRole state

  useEffect(() => {
    // Check localStorage for a token, username, and role on initial load
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('userRole'); // Retrieve role

          if (token) {
            setAuthToken(token);
            setIsLoggedIn(true);
            if (storedUsername && storedUsername !== '[object Object]') { // Add check for "[object Object]"
              setUsername(storedUsername);
            }
            if (storedRole) {
              setUserRole(storedRole); // Set role state
            }
          }  }, []);

  const login = (token, user, role) => { // Accept role parameter
    localStorage.setItem('username', user.userId);
    setIsLoggedIn(true);
    setAuthToken(token);
    setUsername(user.userId);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole'); // Remove role
    setIsLoggedIn(false);
    setAuthToken(null);
    setUsername(null);
    setUserRole(null); // Clear role state
  };

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, username, userRole, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
