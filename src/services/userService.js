import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao buscar usuários';
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
    return 'Usuário excluído com sucesso!';
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao excluir usuário';
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao criar usuário';
  }
};
