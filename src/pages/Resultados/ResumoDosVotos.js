import React, { useEffect, useState } from "react";
import { getResultados } from "../../services/resultadoService";
import "./ResumoDosVotos.css";

const ResumoDosVotos = () => {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await getResultados(); // Chamada da API
        console.log(response);
        setResultados(response);

        
      } catch (err) {
        setError("Erro ao carregar os resultados.");
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  if (!resultados || resultados.length === 0) {
    return <p>Nenhum resultado disponível.</p>;
  }

  return (
    <div className="resultados-votos">
      <h1>Resultados de Votos</h1>
      {resultados.map((chapa) => (
        <div key={chapa.chapa} className="chapa">
          <h2>{chapa.chapa}</h2>
          <table>
            <thead>
              <tr>
                <th>Candidato</th>
                <th>Função</th>
                {Object.keys(chapa.candidatos[0].votosPorSecao).map((secao) => (
                  <th key={secao}>{secao}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {chapa.candidatos.map((candidato) => (
                <tr key={candidato.candidato}>
                  <td>{candidato.candidato}</td>
                  <td>{candidato.funcao}</td>
                  {Object.values(candidato.votosPorSecao).map((votos, index) => (
                    <td key={index}>{votos}</td>
                  ))}
                  <td>{candidato.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ResumoDosVotos;
