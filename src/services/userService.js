import api from "./api";

const RESOURCE = "users";

export const getUsers = async () => {
  try {
    const response = await api.get(RESOURCE);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao buscar usuários';
  }
};

export const deleteUser = async (userId) => {
  try {
    await api.delete(`${RESOURCE}/${userId}`);
    return 'Usuário excluído com sucesso!';
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao excluir usuário';
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post(RESOURCE, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao criar usuário';
  }
};
