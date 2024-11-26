// src/pages/ListNaoConfirmados.js
import React, { useEffect, useState } from 'react';
import './ListNaoConfirmados.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL_API = process.env.REACT_APP_API_URL || "http://179.154.75.165:3001";

function ListNaoConfirmados() {
  const [eleitores, setEleitores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEleitores = async () => {
      try {
        const response = await fetch(`${BASE_URL_API}/eleitores`);
        if (response.ok) {
          const data = await response.json();
          // Filtra apenas os eleitores que ainda não votaram
          const naoConfirmados = data.filter(eleitor => !eleitor.votou);
          // Ordena os eleitores pelo ID
          const sortedEleitores = naoConfirmados.sort((a, b) => a.id - b.id);
          setEleitores(sortedEleitores);
        } else {
          console.error('Erro ao buscar eleitores');
          alert('Erro ao buscar eleitores');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchEleitores();
  }, []);

  const handleDelete = async (matricula) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este eleitor?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL_API}/eleitores/${matricula}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEleitores(eleitores.filter(eleitor => eleitor.matricula !== matricula));
        alert('Eleitor excluído com sucesso!');
      } else {
        console.error('Erro ao deletar eleitor');
        alert('Erro ao deletar eleitor');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  // Calcula o total de eleitores não confirmados
  const totalNaoConfirmados = eleitores.length;

  return (
    <div className="list-eleitores-container">
      <h2>Presença não Confirmada</h2>
      
      {/* Card com a quantidade total de eleitores não confirmados */}
      <div className="total-nao-confirmados-card">
        <h3>Total de Presenças <br></br>
           não Confirmadas</h3>
        <p>{totalNaoConfirmados}</p>
      </div>

      <button onClick={handleBack} className="back-button">Voltar</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Patente</th>
            <th>Status</th>
            <th>Votou</th>
          </tr>
        </thead>
        <tbody>
          {eleitores.map((eleitor) => (
            <tr key={eleitor.matricula}>
              <td>{eleitor.id}</td>
              <td>{eleitor.matricula}</td>
              <td>{eleitor.nome}</td>
              <td>{eleitor.cpf}</td>
              <td>{eleitor.patente}</td>
              <td>{eleitor.status}</td>
              <td className="status-nao-confirmado">Não Confirmado</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListNaoConfirmados;
