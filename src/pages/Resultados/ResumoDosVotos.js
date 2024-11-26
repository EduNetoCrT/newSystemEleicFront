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

  const orderCandidatos = (candidatos) => {
    const ordemPrincipal = [
      "Presidente",
      "Vice-Presidente",
      "Conselheiros",
      "Suplentes",
    ];

    return candidatos.sort((a, b) => {
      const indexA = ordemPrincipal.indexOf(a.funcao);
      const indexB = ordemPrincipal.indexOf(b.funcao);

      if (indexA !== indexB) {
        return indexA - indexB;
      }

      return a.candidato.localeCompare(b.candidato); // Ordem alfabética como desempate
    });
  };

  return (
    <div className="resultados-votos">
      <h1>Resultados de Votos</h1>
      {resultados.map((chapa) => {
        const cidades = Object.keys(
          chapa.candidatos[0].votosPorSecao
        ); /* Extrai cidades */
        const candidatosOrdenados = orderCandidatos(chapa.candidatos);

        return (
          <div key={chapa.chapa} className="chapa">
            <h2>{chapa.chapa}</h2>
            <table>
              <thead>
                <tr>
                  <th>Candidato</th>
                  <th>Função</th>
                  {cidades.map((cidade) => (
                    <th key={cidade}>{cidade}</th>
                  ))}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {candidatosOrdenados.map((candidato) => (
                  <tr key={candidato.candidato}>
                    <td>{candidato.candidato}</td>
                    <td>{candidato.funcao}</td>
                    {cidades.map((cidade) => (
                      <td key={cidade}>
                        {candidato.votosPorSecao[cidade] || 0}
                      </td>
                    ))}
                    <td>{candidato.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default ResumoDosVotos;
