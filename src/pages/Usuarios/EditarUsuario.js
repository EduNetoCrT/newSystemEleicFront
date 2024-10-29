import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import UserForm from "../../components/UserForm";


const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

function EditarUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      if (!isValidUUID(id)) {
        alert("ID inválido");
        navigate("/users"); // Redireciona para a lista de usuários
        return;
      }
  
      const fetchUser = async () => {
        try {
          const response = await api.get(`/users/${id}`);
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      };
  
      fetchUser();
    }, [id, navigate]);
  
    const handleUpdateUser = async (data) => {
      try {
        await api.put(`/users/${id}`, data);
        navigate("/users"); // Redireciona para a lista de usuários
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
      }
    };
  
    return (
      <div>
        <h1>Editar Usuário</h1>
        {user ? (
          <UserForm onSubmit={handleUpdateUser} initialData={user} />
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    );
  }

export default EditarUsuario;
