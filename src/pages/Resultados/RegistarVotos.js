import "./RegistrarVotos.css";
import { useState, useEffect } from "react";
import { addVotes, getAllChapas } from "../../services/resultadoService";
import useUserInfo from "../../hooks/useUserInfo";

const RegistrarVotos = () => {
  const { secaoId } = useUserInfo();
  const [chapas, setChapas] = useState([]);
  const [votos, setVotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votosInvalidos, setVotosInvalidos] = useState(0);

  useEffect(() => {
    const fetchChapas = async () => {
      try {
        const response = await getAllChapas();

        // Ordena candidatos por ID dentro de cada chapa
        response.forEach((chapa) => {
          chapa.candidatos.sort((a, b) => a.id - b.id);
        });

        setChapas(response);

        // Inicializar votos com valores zerados
        const initialVotos = response.flatMap((chapa) =>
          chapa.candidatos.map((candidato) => ({
            candidatoId: candidato.id,
            secaoId: secaoId,
            quantidade: "",
          }))
        );
        setVotos(initialVotos);
      } catch (err) {
        setError("Erro ao buscar as chapas.");
      } finally {
        setLoading(false);
      }
    };

    fetchChapas();
  }, [secaoId]);

  const handleVoteChange = (candidatoId, quantidade) => {
    setVotos((prev) =>
      prev.map((voto) =>
        voto.candidatoId === candidatoId
          ? { ...voto, quantidade: Math.max(0, quantidade) }
          : voto
      )
    );
  };

  const calculateTotals = (candidatos) => {
    const total = candidatos.reduce((acc, candidato) => {
      const voto = votos.find((v) => v.candidatoId === candidato.id);
      return acc + (voto?.quantidade || 0);
    }, 0);

    return { total, invalidos: votosInvalidos };
  };

  const handleInvalidVotesChange = (value) => {
    setVotosInvalidos(Math.max(0, parseInt(value, 10) || 0));
  };

  const handleSubmit = async () => {
    try {
      await addVotes(votos);
      alert("Votos registrados com sucesso!");
    } catch (err) {
      alert("Erro ao registrar os votos.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="votos-container">
      <h1>Registrar Votos</h1>
      <div className="chapas-wrapper">
        {chapas.map((chapa) => {
          const { total, invalidos } = calculateTotals(chapa.candidatos);

          return (
            <div key={chapa.id} className="chapa-tabela">
              <h2>{chapa.nome}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Função</th>
                    <th>Matrícula</th>
                    <th>Nome</th>
                    <th>Votos</th>
                  </tr>
                </thead>
                <tbody>
                  {chapa.candidatos.map((candidato) => (
                    <tr key={candidato.id}>
                      <td>{candidato.funcao}</td>
                      <td>{candidato.matricula}</td>
                      <td>{candidato.nome}</td>
                      <td>
                        <input
                          type="number"
                          className="input-votos"
                          min="0"
                          placeholder="-"
                          value={
                            votos.find((voto) => voto.candidatoId === candidato.id)
                              ?.quantidade || ""
                          }
                          onChange={(e) =>
                            handleVoteChange(
                              candidato.id,
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                  {/* Linha de votos inválidos */}
                  <tr>
                    <td colSpan="3" className="invalidos-label">
                      Votos Inválidos
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input-votos"
                        min="0"
                        placeholder="0"
                        value={invalidos}
                        onChange={(e) => handleInvalidVotesChange(e.target.value)}
                      />
                    </td>
                  </tr>
                  {/* Linha de total */}
                  <tr>
                    <td colSpan="3" className="total-label">
                      Total
                    </td>
                    <td>{total + invalidos}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <button type="button" className="botao-enviar" onClick={handleSubmit}>
        Enviar Votos
      </button>
    </div>
  );
};

export default RegistrarVotos;
