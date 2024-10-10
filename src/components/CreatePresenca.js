import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './CreatePresenca.css';
import Sidebar from './Sidebar'; // Importando o componente Sidebar

function CreatePresenca() {
  const [formData, setFormData] = useState({
    sessaoId: '',
    eleitorMatricula: '',
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
      const response = await axios.post('http://localhost:3001/presencas', formData);
      alert(response.data.message);

      // Limpa os dados do formulário após sucesso
      setFormData({
        sessaoId: '',
        eleitorMatricula: '',
      });
    } catch (error) {
      alert('Erro ao registrar presença: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div>
      <div>
        <div className="create-presenca-container">
          <h2 className="form-title">Registrar Presença</h2>
          <form className="create-presenca-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="sessaoId" 
              placeholder="ID da Sessão" 
              onChange={handleChange} 
              required 
              value={formData.sessaoId} 
            />
            <input 
              type="text" 
              name="eleitorMatricula" 
              placeholder="Matrícula do Eleitor" 
              onChange={handleChange} 
              required 
              value={formData.eleitorMatricula} 
            />
            <button type="submit">Registrar Presença</button>
          </form>
          <button onClick={handleBack} className="back-button">Voltar</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePresenca;
