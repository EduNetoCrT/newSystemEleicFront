import { useState } from "react";
import "./UpdateEleitor.css";
import {
  getAssociadoByMatricula,
  updateAssociado,
} from "../../services/associadoService";

function UpdateEleitor() {
  const [matricula, setMatricula] = useState("");
  const [eleitor, setEleitor] = useState(null);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [patente, setPatente] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getAssociadoByMatricula(matricula);
      setEleitor(data);
      setNome(data.nome);
      setCpf(data.cpf);
      setPatente(data.patente);
      setStatus(data.status);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      setEleitor(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedEleitor = await updateAssociado(matricula, {
        nome,
        cpf,
        patente,
        status,
      });
      console.log("Eleitor atualizado:", updatedEleitor);
      alert("Eleitor atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="update-eleitor-container">
      <h2 className="form-title">Atualizar Eleitor</h2>
      <form onSubmit={handleSearch} className="update-eleitor-form">
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
        <button type="submit">Pesquisar Eleitor</button>
      </form>

      {eleitor && (
        <form onSubmit={handleUpdate} className="update-eleitor-form">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Patente"
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Selecione o status</option>
            <option value="APTO">APTO</option>
            <option value="INAPTO">INAPTO</option>
          </select>
          <button type="submit">Atualizar Eleitor</button>
        </form>
      )}
    </div>
  );
}

export default UpdateEleitor;
