// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ajuste o caminho conforme necessário

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa a função de login do contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password: senha });
      login(response.data.token); // Chama a função de login do contexto para atualizar o estado
      navigate('/'); // Redireciona para a home
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Login falhou: ' + (error.response?.data?.message || 'Erro desconhecido'));
    }
  };

  return (
    <div className="login-container">
      <div className="login-text">
        <p>
          Caro usuário, este é o sistema para gerenciar a presença dos associados que irão efetuar o seu voto.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
