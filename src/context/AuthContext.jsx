// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [displayUsername, setDisplayUsername] = useState(null);
  const [userRole, setUserRole] = useState(null); // Add userRole state

  useEffect(() => {
    // Check localStorage for a token, currentUserId, displayUsername, and role on initial load
    const token = localStorage.getItem('authToken');
    const storedCurrentUserId = localStorage.getItem('currentUserId');
    const storedDisplayUsername = localStorage.getItem('displayUsername');
    const storedRole = localStorage.getItem('userRole'); // Retrieve role

          if (token) {
            setAuthToken(token);
            setIsLoggedIn(true);
            if (storedCurrentUserId && storedCurrentUserId !== '[object Object]') {
              setCurrentUserId(storedCurrentUserId.toString());
            }
            if (storedDisplayUsername && storedDisplayUsername !== '[object Object]') {
              setDisplayUsername(storedDisplayUsername);
            }
            if (storedRole) {
              setUserRole(storedRole); // Set role state
            }
          }  }, []);

  const login = (token, user, role) => { // Accept role parameter
    localStorage.setItem('currentUserId', user._id.toString());
    localStorage.setItem('displayUsername', user.name);
    setIsLoggedIn(true);
    setAuthToken(token);
    setCurrentUserId(user._id.toString());
    setDisplayUsername(user.name);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('displayUsername');
    localStorage.removeItem('userRole'); // Remove role
    setIsLoggedIn(false);
    setAuthToken(null);
    setCurrentUserId(null);
    setDisplayUsername(null);
    setUserRole(null); // Clear role state
  };

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, currentUserId, displayUsername, userRole, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
