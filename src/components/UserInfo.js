import React from 'react';
import { useAuth } from '../hooks/useAuth';


function UserInfo() {
  const { user, logout } = useAuth(); // Obtém o usuário logado e a função de logout

  if (!user) return null; // Retorna null se não houver usuário logado

  return (
    <div className="user-info">
      <span className="user-name">Bem-vindo, {user.email}</span>
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
}

export default UserInfo;
