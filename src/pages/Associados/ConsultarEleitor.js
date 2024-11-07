import { useState } from "react";
import "./ConsultarEleitor.css";
import { getAssociadoByMatricula } from "../../services/associadoService"; // Importa o serviço

function ConsultarEleitor() {
  const [matricula, setMatricula] = useState("");
  const [eleitor, setEleitor] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getAssociadoByMatricula(matricula); // Usa o serviço para buscar o associado
      setEleitor(data);
      setMessage(""); // Limpa a mensagem de erro
    } catch (error) {
      setMessage(error.message); // Exibe a mensagem de erro
      setEleitor(null);
    }
  };

  return (
    <div className="consultar-eleitor-container">
      <h2 className="form-title">Consultar Eleitor</h2>

      <form onSubmit={handleSearch} className="consultar-eleitor-form">
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
        <button type="submit">Buscar Eleitor</button>
      </form>

      {eleitor && (
        <div className="eleitor-info">
          <input type="text" value={eleitor.matricula} readOnly />
          <input type="text" value={eleitor.nome} readOnly />
          <input type="text" value={eleitor.cpf} readOnly />
          <input type="text" value={eleitor.patente} readOnly />
          <input type="text" value={eleitor.status} readOnly />
          <input
            type="text"
            value={eleitor.votou ? "Confirmado" : "Não Confirmado"}
            readOnly
          />
        </div>
      )}

      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default ConsultarEleitor;
