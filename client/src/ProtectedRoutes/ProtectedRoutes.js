import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  // Fetch token from localStorage
  const token = localStorage.getItem('token');

  // If no token is available, redirect to the sign-in page
  if (!token) {
    return <Navigate to="/" />;
  }

  // If token is available, render the children
  return children;
};

export default ProtectedRoutes;
