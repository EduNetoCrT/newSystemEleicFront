import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAssociado,
  updateAssociado,
  getAssociadoByMatricula,
} from "../../services/associadoService";
import "./CreateEleitor.css";

function CreateEleitor() {
  const [formData, setFormData] = useState({
    matricula: "",
    nome: "",
    cpf: "",
    patente: "",
    status: "APTO",
    observacao: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "matricula" && value.length === 7) {
      fetchEleitorData(value);
    }
  };

  const fetchEleitorData = async (matricula) => {
    try {
      const data = await getAssociadoByMatricula(matricula);
      setFormData(data);
      setIsEditing(true);
    } catch (error) {
      console.error(error.message);
      setIsEditing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const response = await updateAssociado(formData.matricula, formData);
        alert(response.message || "Eleitor atualizado com sucesso!");
      } else {
        const response = await createAssociado(formData);
        alert(response.message || "Eleitor criado com sucesso!");
      }

      setFormData({
        matricula: "",
        nome: "",
        cpf: "",
        patente: "",
        status: "APTO",
        observacao: "",
      });
      setIsEditing(false);
    } catch (error) {
      alert("Erro ao enviar o formulário: " + error.message);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="create-eleitor-container">
        <h2 className="form-title">
          {isEditing ? "Atualizar Eleitor" : "Cadastrar Associado"}
        </h2>
        <form className="create-eleitor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            onChange={handleChange}
            required
            value={formData.matricula}
          />
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            onChange={handleChange}
            required
            value={formData.nome}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            onChange={handleChange}
            required
            value={formData.cpf}
          />

          <select
            name="patente"
            onChange={handleChange}
            value={formData.patente}
            required
          >
            <option value="">Patente</option>
            <option value="2° Tenente">2° Tenente</option>
            <option value="1° Tenente">1° Tenente</option>
            <option value="Capitão">Capitão</option>
            <option value="Major">Major</option>
            <option value="Tenente Coronel">Tenente Coronel</option>
            <option value="Coronel">Coronel</option>
          </select>

          <select name="status" onChange={handleChange} value={formData.status}>
            <option value="APTO">APTO</option>
            <option value="INAPTO">INAPTO</option>
          </select>

          {formData.status === "INAPTO" && (
            <textarea
              name="observacao"
              placeholder="Observação"
              onChange={handleChange}
              value={formData.observacao}
              required
            ></textarea>
          )}

          <button type="submit">
            {isEditing ? "Atualizar Eleitor" : "Criar Associado"}
          </button>
        </form>
        <button onClick={handleBack} className="back-button">
          Voltar
        </button>
      </div>
    </div>
  );
}

export default CreateEleitor;
