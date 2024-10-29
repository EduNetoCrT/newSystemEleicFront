import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Aguarda até que o estado de carregamento termine
  if (loading) {
    return <div>Carregando...</div>; // Pode ser um spinner ou qualquer componente de loading
  }

  // Redireciona para login se não estiver autenticado
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
