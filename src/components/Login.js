// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    section: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log(formData);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          value={formData.email} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Senha" 
          onChange={handleChange} 
          required 
          value={formData.password} 
        />
        <input 
          type="text" 
          name="section" 
          placeholder="Seção" 
          onChange={handleChange} 
          required 
          value={formData.section} 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
