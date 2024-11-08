import axios from 'axios';

const BASE_URL_API = process.env.REACT_APP_BASE_URL_API || "http://localhost:3001";
const API_URL = `${BASE_URL_API}/users`;

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
