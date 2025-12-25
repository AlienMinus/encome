// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  
  useEffect(() => {
    // Check localStorage for auth token and user data on initial load
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setAuthToken(token);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setAuthToken(null);
    setUser(null);
  };

  const getToken = () => {
    return authToken;
  };

  const isLoggedIn = !!authToken;
  const currentUserId = user?._id;
  const displayUsername = user?.username || user?.name;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, getToken, currentUserId, displayUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


export default AuthContext;