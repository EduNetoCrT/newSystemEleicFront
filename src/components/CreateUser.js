// src/components/CreateUser.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateUser.css'; // Importando o CSS

function CreateUser() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    secao: '', // Novo campo 'secao'
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal de sucesso
  const [showErrorModal, setShowErrorModal] = useState(false); // Modal de erro
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  // Função para lidar com a mudança de valores dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para enviar os dados (criando um novo usuário)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/users', formData);
      setModalMessage(response.data.message || 'Usuário criado com sucesso!');
      setShowSuccessModal(true); // Exibe o modal de sucesso

      // Limpa o formulário após o sucesso
      setFormData({
        email: '',
        name: '',
        password: '',
        secao: '', // Limpa o novo campo
      });
    } catch (error) {
      if (error.response?.status === 409) { // E-mail já cadastrado
        setModalMessage('E-mail já cadastrado. Tente outro.');
        setShowErrorModal(true); // Exibe o modal de erro
      } else {
        alert('Erro ao enviar o formulário: ' + (error.response?.data?.message || error.message));
      }
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
          value={formData.secao} // Controle o valor
        />
        <button type="submit">Criar Usuário</button>
      </form>
      <button onClick={handleBack} className="back-button">Voltar</button>

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeSuccessModal}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal de erro (e-mail já cadastrado) */}
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
