import { useState } from "react";
import "./UpdateStatus.css";
import {
  getAssociadoByMatricula,
  updateAssociadoStatus,
} from "../../services/associadoService";

function UpdateStatus() {
  const [matricula, setMatricula] = useState("");
  const [eleitor, setEleitor] = useState(null);
  const [status, setStatus] = useState("");
  const [observacao, setObservacao] = useState("");  // Novo estado para observação
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getAssociadoByMatricula(matricula);
      setEleitor(data);
      setStatus(data.status);
    } catch (error) {
      setModalMessage(error.message);
      setShowModal(true);
      setEleitor(null);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      if (status === "INAPTO" && !observacao) {
        setModalMessage("É necessário preencher a observação para status INAPTO.");
        setShowModal(true);
        return; // Não atualiza se a observação não for preenchida
      }

      await updateAssociadoStatus(matricula, status, observacao);
      setModalMessage("Status atualizado com sucesso!");
      setShowModal(true);
    } catch (error) {
      setModalMessage(error.message);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="update-status-container">
      <h2 className="form-title">Alterar Status do Eleitor</h2>

      <form onSubmit={handleSearch} className="update-status-form">
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
        <form onSubmit={handleUpdateStatus} className="update-status-form">
          <input type="text" value={eleitor.matricula} readOnly />
          <input type="text" value={eleitor.nome} readOnly />
          <input type="text" value={eleitor.cpf} readOnly />
          <input type="text" value={eleitor.patente} readOnly />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="APTO">APTO</option>
            <option value="INAPTO">INAPTO</option>
          </select>

          {/* Renderiza o campo de observação apenas se o status for INAPTO */}
          {status === "INAPTO" && (
            <div className="observacao-container">
              <label htmlFor="observacao">Observação:</label>
              <textarea
                id="observacao"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit">Atualizar Status</button>
        </form>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateStatus;
