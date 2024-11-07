import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Importação nomeada para jwtDecode
import "./Header.css";

function Header() {
  const [userName, setUserName] = useState("");
  const [userSecao, setUserSecao] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token && token.split('.').length === 3) {  // Verifica se o token está no formato JWT
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name || "Usuário"); // Nome do usuário ou valor padrão
        setUserSecao(decodedToken.secao || "N/A"); // Sessão do usuário ou valor padrão
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.warn("Token inválido ou ausente");
    }
  }, []);

  return (
    <div className="header">
      <div className="logo">Caixa Beneficente PM/BM</div>
      <div className="user-info">
        <span>Bem-vindo, {userName}</span> {/* Exibindo o nome do usuário */}
        <span>Sessão: {userSecao}</span> {/* Exibindo a sessão do usuário */}
      </div>
    </div>
  );
}

export default Header;
