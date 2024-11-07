// src/components/CreateSessao.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateSessao.css';

function CreateSessao() {
  const [formData, setFormData] = useState({
    local: '',
    numero: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/sessoes', formData); // URL da API
      alert(response.data.message);

      // Limpa os dados do formulário após sucesso
      setFormData({
        local: '',
        numero: '',
      });
    } catch (error) {
      alert('Erro ao criar sessão: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="create-sessao-container">
        <h2 className="form-title">Cadastrar Sessão</h2>
        <form className="create-sessao-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="local" 
            placeholder="Local" 
            onChange={handleChange} 
            required 
            value={formData.local} 
          />
          <input 
            type="text" 
            name="numero" 
            placeholder="Número" 
            onChange={handleChange} 
            required 
            value={formData.numero} 
          />
          <button type="submit">Criar Sessão</button>
        </form>
        <button onClick={handleBack} className="back-button">Voltar</button> {/* Botão de Voltar */}
      </div>
    </div>
  );
}

export default CreateSessao;
