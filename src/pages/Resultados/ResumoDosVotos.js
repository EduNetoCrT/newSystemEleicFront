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

      // Ordenação secundária: ID em ordem crescente
      return a.id - b.id;
    });
  };

  const calcularTotais = (candidatos) => {
    let totalChapa = 0;

    const candidatosComTotal = candidatos.map((candidato) => {
      const totalCandidato = Object.values(candidato.votosPorSecao).reduce(
        (acc, votos) => acc + votos,
        0
      );
      totalChapa += totalCandidato;
      return { ...candidato, total: totalCandidato };
    });

    return { candidatosComTotal, totalChapa };
  };

  const ordenarCidades = (cidades) => {
    return cidades.sort((a, b) => a.localeCompare(b)); // Ordena as cidades alfabeticamente
  };

  const calcularTotaisPorCidade = (candidatos, cidades) => {
    const totaisPorCidade = {};

    // Inicializamos o objeto com todas as cidades e valores zero
    cidades.forEach((cidade) => {
      totaisPorCidade[cidade] = 0;
    });

    // Soma os votos de cada cidade para todos os candidatos
    candidatos.forEach((candidato) => {
      cidades.forEach((cidade) => {
        totaisPorCidade[cidade] += candidato.votosPorSecao[cidade] || 0;
      });
    });

    return totaisPorCidade;
  };

  return (
    <div className="resultados-votos">
      <h1>Resultados de Votos</h1>
      {resultados.map((chapa) => {
        const cidades = ordenarCidades(Object.keys(chapa.candidatos[0].votosPorSecao));
        const { candidatosComTotal } = calcularTotais(chapa.candidatos);
        const candidatosOrdenados = orderCandidatos(candidatosComTotal);

        // Calcula os totais por cidade
        const totaisPorCidade = calcularTotaisPorCidade(chapa.candidatos, cidades);

        // Calcula a soma dos votos de todas as cidades
        const somaTotalCidades = Object.values(totaisPorCidade).reduce(
          (acc, votos) => acc + votos,
          0
        );

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
                  <tr key={candidato.id}>
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
                {/* Linha de soma total das cidades */}
                <tr className="soma-total-cidades">
                  <td colSpan={2}>Soma Total</td>
                  {cidades.map((cidade) => (
                    <td key={cidade}>{totaisPorCidade[cidade]}</td>
                  ))}
                  <td>{somaTotalCidades}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default ResumoDosVotos;
