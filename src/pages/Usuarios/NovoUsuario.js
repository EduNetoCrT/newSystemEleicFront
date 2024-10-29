import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import UserForm from "../../components/UserForm";


function CriarUsuario() {
  const navigate = useNavigate();

  const handleCreateUser = async (data) => {
    try {
      await api.post("/users", data);
      navigate("/users"); // Redireciona para a lista de usuários
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div>
      <h1>Criar Usuário</h1>
      <UserForm onSubmit={handleCreateUser} />
    </div>
  );
}

export default CriarUsuario;
