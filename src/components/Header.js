import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';  // Corrigido o nome da importação
import './Header.css';

function Header() {
  const [userName, setUserName] = useState('');
  const [userSecao, setUserSecao] = useState('');

  useEffect(() => {
    // Obtendo o token do armazenamento local (ou de outro local, dependendo de onde você o salva)
    const token = localStorage.getItem('token');  // Ou o método que você usa para armazenar o token
    if (token) {
      // Decodificando o token para extrair as informações do usuário
      const decodedToken = jwtDecode(token);  // Usando jwtDecode com "D" maiúsculo
      setUserName(decodedToken.name);  // Nome do usuário
      setUserSecao(decodedToken.secao);  // Sessão do usuário
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
