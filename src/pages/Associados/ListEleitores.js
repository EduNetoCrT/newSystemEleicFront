// src/components/ListEleitores.js
import { useEffect, useState } from "react";
import "./ListEleitores.css";
import { useNavigate } from "react-router-dom";
import {
  getAllAssociados,
  deleteAssociado,
} from "../../services/associadoService";

function ListEleitores() {
  const [eleitores, setEleitores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEleitores = async () => {
      try {
        const data = await getAllAssociados();
        // Ordena os eleitores pelo ID
        const sortedEleitores = data.sort((a, b) => a.id - b.id);
        setEleitores(sortedEleitores);
      } catch (error) {
        console.error("Erro ao buscar eleitores:", error.message);
        alert(error.message);
      }
    };

    fetchEleitores();
  }, []);

  const handleDelete = async (matricula) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir este eleitor?"
    );
    if (!confirmDelete) return;

    try {
      const message = await deleteAssociado(matricula);
      setEleitores(
        eleitores.filter((eleitor) => eleitor.matricula !== matricula)
      );
      alert(message);
    } catch (error) {
      console.error("Erro ao deletar eleitor:", error.message);
      alert(error.message);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="list-eleitores-container">
      <h2>Lista de Eleitores</h2>
      <button onClick={handleBack} className="back-button">
        Voltar
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Patente</th>
            <th>Status</th>
            <th>Votou</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {eleitores.map((eleitor) => (
            <tr key={eleitor.matricula}>
              <td>{eleitor.id}</td>
              <td>{eleitor.matricula}</td>
              <td>{eleitor.nome}</td>
              <td>{eleitor.cpf}</td>
              <td>{eleitor.patente}</td>
              <td>{eleitor.status}</td>
              <td style={{ color: eleitor.votou ? "green" : "red" }}>
                {eleitor.votou ? "Confirmado" : "Não Confirmado"}
              </td>
              <td>
                <button onClick={() => handleDelete(eleitor.matricula)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEleitores;
