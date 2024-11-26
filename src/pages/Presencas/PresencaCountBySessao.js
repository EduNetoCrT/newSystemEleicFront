// src/pages/PresencaCountBySessao.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './PresencaCountBySessao.css';
import { getAllPresencas } from "../../services/presencasService";
import { getAllEleitores } from "../../services/eleitorService";

const BASE_URL_API = process.env.REACT_APP_API_URL || "http://179.154.75.165:3001";

const initialSessaoCounts = [
  { sessaoId: 1, local: "João Pessoa", presencaCount: 0 },
  { sessaoId: 2, local: "Guarabira", presencaCount: 0 },
  { sessaoId: 3, local: "Campina Grande", presencaCount: 0 },
  { sessaoId: 4, local: "Patos", presencaCount: 0 },
  { sessaoId: 5, local: "Cajazeiras", presencaCount: 0 },
];

function PresencaCountBySessao() {
  const [sessaoCounts, setSessaoCounts] = useState(initialSessaoCounts);
  const [totalConfirmadas, setTotalConfirmadas] = useState(0);
  const [totalNaoConfirmadas, setTotalNaoConfirmadas] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requisição para contagem de presenças por sessão
        const responseSessaoCounts = await fetch(`${BASE_URL_API}/presencas/contagem-por-sessao`);
        if (responseSessaoCounts.ok) {
          const dataSessaoCounts = await responseSessaoCounts.json();
          const updatedSessaoCounts = initialSessaoCounts.map((sessao) => {
            const updatedSessao = dataSessaoCounts.find((item) => item.sessaoId === sessao.sessaoId);
            return updatedSessao ? { ...sessao, presencaCount: updatedSessao.presencaCount } : sessao;
          });
          setSessaoCounts(updatedSessaoCounts);
        } else {
          console.error("Erro ao buscar contagem de presenças");
        }

        // Requisição para total de presenças confirmadas
        const responseConfirmadas = await getAllPresencas();
        if (responseConfirmadas.ok) {
          const dataConfirmadas = await responseConfirmadas.json();
          const confirmadasCount = dataConfirmadas.filter(presenca => presenca.eleitor.votou).length;
          setTotalConfirmadas(confirmadasCount);
        } else {
          console.error("Erro ao buscar presenças confirmadas");
        }

        // Requisição para total de presenças não confirmadas
        const responseNaoConfirmadas = await getAllEleitores();
        if (responseNaoConfirmadas.ok) {
          const dataNaoConfirmadas = await responseNaoConfirmadas.json();
          const naoConfirmadasCount = dataNaoConfirmadas.filter(eleitor => !eleitor.votou).length;
          setTotalNaoConfirmadas(naoConfirmadasCount);
        } else {
          console.error("Erro ao buscar presenças não confirmadas");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData(); // Executa apenas uma vez ao carregar o componente
  }, []); // Removido sessaoCounts das dependências

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="presenca-count-container">
      <h2>Contagem de Presenças por Sessão</h2>
      <button onClick={handleBack} className="back-button">Voltar</button>
      
      {/* Card para cada sessão */}
      <div className="sessao-cards">
        {sessaoCounts.map((sessao) => (
          <div key={sessao.sessaoId} className="sessao-card">
            <h3>Sessão: {sessao.sessaoId}</h3>
            <p><strong>Local:</strong> {sessao.local}</p>
            <p><strong>Quantidade de Presenças:</strong> {sessao.presencaCount}</p>
          </div>
        ))}
      </div>

      {/* Card para o total de presenças confirmadas */}
      <div className="total-confirmadas-card">
        <h3>Total de Presenças Confirmadas</h3>
        <p>{totalConfirmadas}</p>
      </div>

      {/* Card para o total de presenças não confirmadas */}
      <div className="total-nao-confirmadas-card">
        <h3>Total de Presenças Não Confirmadas</h3>
        <p>{totalNaoConfirmadas}</p>
      </div>
    </div>
  );
}

export default PresencaCountBySessao;
