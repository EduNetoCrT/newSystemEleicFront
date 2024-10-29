import { useState } from 'react';

function UpdateEleitor() {
  const [matricula, setMatricula] = useState('');
  const [eleitor, setEleitor] = useState(null);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [patente, setPatente] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/eleitores/${matricula}`);
      if (response.ok) {
        const data = await response.json();
        setEleitor(data);
        setNome(data.nome);
        setCpf(data.cpf);
        setPatente(data.patente);
        setStatus(data.status);
      } else {
        console.error('Eleitor não encontrado');
        alert('Eleitor não encontrado');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/eleitores/${matricula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, cpf, patente, status }),
      });

      if (response.ok) {
        const updatedEleitor = await response.json();
        console.log('Eleitor atualizado:', updatedEleitor);
        alert('Eleitor atualizado com sucesso!');
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar:', errorData);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="create-presenca-container">
      <h2 className="form-title">Atualizar Eleitor</h2>
      <form onSubmit={handleSearch} className="create-presenca-form">
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
        <button type="submit">Pesquisar Eleitor</button>
      </form>

      {eleitor && (
        <form onSubmit={handleUpdate} className="create-presenca-form">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Patente"
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Selecione o status</option>
            <option value="APTO">APTO</option>
            <option value="INAPTO">INAPTO</option>
          </select>
          <button type="submit">Atualizar Eleitor</button>
        </form>
      )}
    </div>
  );
}

export default UpdateEleitor;
