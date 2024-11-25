// src/components/ListSessoes.js
import { useEffect, useState } from 'react';
import './ListSessoes.css';

const BASE_URL_API = process.env.REACT_APP_API_URL || "http://localhost:3001";

function ListSessoes() {
  const [sessoes, setSessoes] = useState([]);

  useEffect(() => {
    const fetchSessoes = async () => {
      try {
        const response = await fetch(`${BASE_URL_API}/sessoes`);
        const data = await response.json();
        setSessoes(data);
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
