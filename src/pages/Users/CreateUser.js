// src/components/CreateUser.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userService"; // Importa o serviço
import "./CreateUser.css";

function CreateUser() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    secao: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createUser(formData); // Usa o serviço para criar o usuário
      setModalMessage(response.message || "Usuário criado com sucesso!");
      setShowSuccessModal(true);

      // Limpa o formulário após o sucesso
      setFormData({
        email: "",
        name: "",
        password: "",
        secao: "",
      });
    } catch (errorMessage) {
      setModalMessage(errorMessage);
      setShowErrorModal(true);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="create-user-container">
      <h2 className="form-title">Cadastrar Usuário</h2>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          required
          value={formData.email}
        />
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          required
          value={formData.name}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleChange}
          required
          value={formData.password}
        />
        <input
          type="text"
          name="secao"
          placeholder="Seção"
          onChange={handleChange}
          required
          value={formData.secao}
        />
        <button type="submit">Criar Usuário</button>
      </form>
      <button onClick={handleBack} className="back-button">
        Voltar
      </button>

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeSuccessModal}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal de erro */}
      {showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeErrorModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateUser;
