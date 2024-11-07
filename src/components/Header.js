import React from "react";
import { useAuth } from "../context/AuthContext"; // Ajuste o caminho conforme necessário
import useUserInfo from "../hooks/useUserInfo";
import "./Header.css";

function Header() {
  const { userName, userSecao } = useUserInfo();
  const { logout } = useAuth(); // Obtém a função de logout do contexto

  return (
    <div className="header">
      <div className="logo">Caixa Beneficente PM/BM</div>
      <div className="user-info">
        <span>Bem-vindo, {userName}</span> {/* Exibindo o nome do usuário */}
        <span>Sessão: {userSecao}</span> {/* Exibindo a sessão do usuário */}
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </div>
  );
}

export default Header;
