import "./RegistrarVotos.css";
import { useState, useEffect } from "react";
import { addVotes, getAllChapas } from "../../services/resultadoService";
import useUserInfo from "../../hooks/useUserInfo";

const RegistrarVotos = () => {
  const { secaoId } = useUserInfo(); // Obtém informações do usuário
  const [chapas, setChapas] = useState([]);
  const [votos, setVotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchChapas = async () => {
      try {
        const response = await getAllChapas();
        setChapas(response);

        // Inicializar votos com candidatos zerados e associar à userSecao
        const initialVotos = response.flatMap((chapa) =>
          chapa.candidatos.map((candidato) => ({
            candidatoId: candidato.id,
            secaoId: secaoId, // Usa a seção do usuário
            quantidade: 0,
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
  }, [secaoId]); // Atualiza caso a seção do usuário mude

  const handleVoteChange = (candidatoId, quantidade) => {
    setVotos((prev) =>
      prev.map((voto) => voto.candidatoId === candidatoId
        ? { ...voto, quantidade: Math.max(0, quantidade) }
        : voto
      )
    );
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
    <div className="votos-formulario">
      <h1>Registrar Votos</h1>
      <form>
        {chapas.map((chapa) => (
          <div key={chapa.id} className="chapa">
            <h2>{chapa.nome}</h2>
            <ul>
              {chapa.candidatos.map((candidato) => (
                <li key={candidato.id} className="candidato">
                  <div className="candidato-linha">
                    <span className="funcao">{candidato.funcao}</span>
                    <span className="matricula">{candidato.matricula}</span>
                    <span className="nome">{candidato.nome}</span>
                    <input
                      type="number"
                      className="input-votos"
                      min="0"
                      placeholder="Qtd"
                      value={
                        votos.find((voto) => voto.candidatoId === candidato.id)
                          ?.quantidade || 0
                      }
                      onChange={(e) =>
                        handleVoteChange(
                          candidato.id,
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="button" className="botao-enviar" onClick={handleSubmit}>
          Enviar Votos
        </button>
      </form>
    </div>
  );
};

export default RegistrarVotos;
