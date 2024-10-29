import { useState } from 'react';
import './UpdateStatus.css'; // Importando o CSS atualizado

function UpdateStatus() {
  const [matricula, setMatricula] = useState('');
  const [eleitor, setEleitor] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/eleitores/${matricula}`);
      if (response.ok) {
        const data = await response.json();
        setEleitor(data);
        setStatus(data.status); // Preenche o status atual
        setMessage('');
      } else {
        setMessage('Eleitor não encontrado');
        setEleitor(null);
      }
    } catch (error) {
      setMessage('Erro na requisição');
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/eleitores/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula, status }),
      });

      if (response.ok) {
        setMessage('Status atualizado com sucesso!');
      } else {
        setMessage('Erro ao atualizar status');
      }
    } catch (error) {
      setMessage('Erro na requisição');
    }
  };

  return (
    <div className="update-status-container">
      <h2 className="form-title">Alterar Status do Eleitor</h2>
      
      <form onSubmit={handleSearch} className="update-status-form">
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
        <form onSubmit={handleUpdateStatus} className="update-status-form">
          <input type="text" value={eleitor.matricula} readOnly />
          <input type="text" value={eleitor.nome} readOnly />
          <input type="text" value={eleitor.cpf} readOnly />
          <input type="text" value={eleitor.patente} readOnly />
          
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="APTO">APTO</option>
            <option value="INAPTO">INAPTO</option>
          </select>

          <button type="submit">Atualizar Status</button>
        </form>
      )}

      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default UpdateStatus;
