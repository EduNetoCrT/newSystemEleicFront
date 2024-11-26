// src/components/ListUsers.js
import { useEffect, useState } from "react";
import "./ListUsers.css";
import { getUsers, deleteUser } from "../../services/userService"; // Importa o serviço

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);

  // Função para buscar todos os usuários
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      console.log(data);
      
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setModalMessage(error); // Exibe a mensagem de erro no modal
      setShowModal(true); // Mostra o modal com o erro
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para abrir o modal de confirmação de exclusão
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setModalMessage("Tem certeza que deseja excluir este usuário?");
    setShowModal(true);
  };

  // Função para excluir usuário
  const handleDeleteUser = async () => {
    try {
      const message = await deleteUser(userToDelete);
      setModalMessage(message); // Exibe a mensagem de sucesso no modal
      fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
      setModalMessage(error); // Exibe a mensagem de erro no modal
    }
    setUserToDelete(null); // Limpa o usuário a ser excluído
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
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
              <th>Seção</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td className="user-name">{user.name}</td>
                <td>{user.secao.local}</td>
                <td>
                  <button onClick={() => handleDeleteClick(user.id)}>
                    Excluir
                  </button>
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
            {userToDelete && (
              <button onClick={handleDeleteUser}>Confirmar</button>
            )}
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListUsers;
