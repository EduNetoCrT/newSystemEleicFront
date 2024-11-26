// src/components/ListSessoes.js
import { useEffect, useState } from 'react';
import './ListSessoes.css';
import { getAllSecoes } from '../../services/secoesService';

function ListSessoes() {
  const [sessoes, setSessoes] = useState([]);

  useEffect(() => {
    const fetchSessoes = async () => {
      try {
        const response = await getAllSecoes();
        setSessoes(response);
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
      }
    };

    fetchSessoes();
  }, []);

  const handleBack = () => {
    console.log("Voltar clicado");
    // Adicione lógica para navegação, se necessário
  };

  return (
    <div className="list-sessoes-container">
      <h2>Lista de Seções</h2>
      <button onClick={handleBack} className="back-button">
        Voltar
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Local</th>
            <th>Número</th>
          </tr>
        </thead>
        <tbody>
          {sessoes.map((sessao) => (
            <tr key={sessao.id}>
              <td>{sessao.id}</td>
              <td>{sessao.local}</td>
              <td>{sessao.numero}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListSessoes;
