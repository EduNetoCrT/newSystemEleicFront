// src/components/ListUsers.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ListerUsers.css'; // Importando o CSS

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [userToDelete, setUserToDelete] = useState(null); // ID do usuário a ser excluído

  // Função para buscar todos os usuários
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para abrir o modal de confirmação de exclusão
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setModalMessage('Tem certeza que deseja excluir este usuário?');
    setShowModal(true);
  };

  // Função para excluir usuário
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3001/users/${userToDelete}`);
      setModalMessage('Usuário excluído com sucesso!');
      fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
      setModalMessage('Erro ao excluir usuário: ' + (error.response?.data?.message || error.message));
    }
    setUserToDelete(null); // Limpa o usuário a ser excluído
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null); // Limpa o usuário a ser excluído ao fechar o modal
  };

  return (
    <div className="list-users-container">
      <h2 className="form-title">Listar Usuários</h2>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nome</th>
              <th>Seção</th> {/* Nova coluna para Seção */}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td className="user-name">{user.name}</td>
                <td>{user.secao}</td> {/* Exibindo a seção */}
                <td>
                  <button onClick={() => handleDeleteClick(user.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de confirmação de exclusão */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={handleDeleteUser}>Confirmar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListUsers;
