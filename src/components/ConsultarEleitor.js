// src/components/ConsultarEleitor.js
import React, { useState } from 'react';
import './ConsultarEleitor.css'; // Importando o CSS

function ConsultarEleitor() {
  const [matricula, setMatricula] = useState('');
  const [eleitor, setEleitor] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/eleitores/${matricula}`);
      if (response.ok) {
        const data = await response.json();
        setEleitor(data);
        setMessage(''); // Limpa a mensagem de erro
      } else {
        setMessage('Eleitor não encontrado');
        setEleitor(null);
      }
    } catch (error) {
      setMessage('Erro na requisição');
    }
  };

  return (
    <div className="consultar-eleitor-container">
      <h2 className="form-title">Consultar Eleitor</h2>
      
      <form onSubmit={handleSearch} className="consultar-eleitor-form">
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
        <button type="submit">Buscar Eleitor</button>
      </form>

      {eleitor && (
        <div className="eleitor-info">
          <input type="text" value={eleitor.matricula} readOnly />
          <input type="text" value={eleitor.nome} readOnly />
          <input type="text" value={eleitor.cpf} readOnly />
          <input type="text" value={eleitor.patente} readOnly />
          <input type="text" value={eleitor.status} readOnly /> {/* Exibindo o status como texto */}
          <input type="text" value={eleitor.votou ? 'Confirmado' : 'Não Confirmado'} readOnly />
        </div>
      )}

      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default ConsultarEleitor;
