// src/components/CreatePresenca.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importando jwt-decode para decodificar o token
import './CreatePresenca.css';


const BASE_URL_API = "http://ec2-54-163-88-195.compute-1.amazonaws.com:3001";

function CreatePresenca() {
  const [matricula, setMatricula] = useState('');
  const [eleitor, setEleitor] = useState(null);
  const [local, setLocal] = useState(''); // Inicialmente vazio, mas será preenchido com a sessão do usuário
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Decodifica o token JWT para obter a sessão do usuário
    const token = localStorage.getItem('token'); // Presumindo que o token está armazenado no localStorage após o login
    if (token) {
      const decodedToken = jwtDecode(token);
      setLocal(decodedToken.secao); // Define a sessão do usuário logado no campo "local"
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL_API}/eleitores/${matricula}`);
      if (response.ok) {
        const data = await response.json();
        setEleitor(data);
        setMessage('');

        if (data.status === 'INAPTO') {
          setModalMessage('O associado está inapto ao voto. Favor procurar a gerência para sanar pendências.');
          setShowModal(true);
        } else if (data.votou) {
          setModalMessage(`O associado ${data.nome} com matrícula ${data.matricula} já confirmou presença na sessão ${data.local}.`);
          setShowModal(true);
        }
      } else {
        setMessage('Eleitor não encontrado');
        setEleitor(null);
      }
    } catch (error) {
      setMessage('Erro na requisição');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!eleitor) {
      setMessage('Por favor, consulte um eleitor primeiro.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL_API}/presencas`, {
        local,
        eleitorMatricula: eleitor.matricula,
      });
      setModalMessage('Presença registrada com sucesso!');
      setShowModal(true);

      setLocal(''); // Limpa o campo após o registro
      setEleitor(null);
      setMatricula('');
    } catch (error) {
      setMessage('Erro ao registrar presença: ' + (error.response?.data?.message || error.message));
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="create-presenca-container">
      <h2 className="form-title">Registrar Presença</h2>

      <form onSubmit={handleSearch} className="create-presenca-form">
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
        <button type="submit">Consultar</button>
      </form>

      {eleitor && eleitor.status === 'APTO' && !eleitor.votou && (
        <form onSubmit={handleRegister} className="create-presenca-form">
          <input type="text" value={eleitor.matricula} readOnly />
          <input type="text" value={eleitor.nome} readOnly />
          <input type="text" value={eleitor.cpf} readOnly />
          <input type="text" value={eleitor.patente} readOnly />

          <input
            type="text"
            placeholder="Local da Sessão"
            value={local}
            readOnly // Campo de local agora preenchido automaticamente e somente leitura
          />
          <button type="submit">Registrar Presença</button>
        </form>
      )}

      {message && <p className="error-message">{message}</p>}

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

export default CreatePresenca;
