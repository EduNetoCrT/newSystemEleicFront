import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userService"; // Serviço para criar usuário
import "./CreateUser.css";
import { getAllSecoes } from "../../services/secoesService";

function CreateUser() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    secaoId: "",
  });

  const [secoes, setSecoes] = useState([]); // Lista de seções para o dropdown
  const [loadingSecoes, setLoadingSecoes] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSecoes = async () => {
      try {
        const response = await getAllSecoes(); // Chamada para obter as seções
        setSecoes(response); // Assume que response é uma lista de seções
      } catch (error) {
        console.error("Erro ao carregar as seções:", error);
      } finally {
        setLoadingSecoes(false);
      }
    };

    fetchSecoes();
  }, []);

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
        secaoId: "",
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
        {loadingSecoes ? (
          <p>Carregando seções...</p>
        ) : (
          <select
            name="secaoId"
            value={formData.secaoId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione uma seção
            </option>
            {secoes.map((secao) => (
              <option key={secao.id} value={secao.id}>
                {secao.local} - {secao.numero}
              </option>
            ))}
          </select>
        )}
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
