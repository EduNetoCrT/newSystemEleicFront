import axios from "axios";

const API_URL = "http://localhost:3001";

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro desconhecido";
  }
};
