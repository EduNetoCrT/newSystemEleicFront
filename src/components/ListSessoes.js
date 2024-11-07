// src/components/ListSessoes.js
import { useEffect, useState } from 'react';

function ListSessoes() {
  const [sessoes, setSessoes] = useState([]);

  useEffect(() => {
    const fetchSessoes = async () => {
      try {
        const response = await fetch('/sessoes'); // Faz uma requisição para a API
        const data = await response.json();
        setSessoes(data);
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
      }
    };

    fetchSessoes();
  }, []);

  return (
    <div>
      <h2>Lista de Sessões</h2>
      <ul>
        {sessoes.map((sessao) => (
          <li key={sessao.id}>
            <p>Local: {sessao.local}</p>
            <p>Número: {sessao.numero}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListSessoes;
