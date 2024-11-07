// src/components/PrivateRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('token'); // Verifica se há um token no localStorage

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
