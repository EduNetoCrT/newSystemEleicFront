import axios from "axios";

const BASE_URL_API = process.env.REACT_APP_BASE_URL_API || "http://localhost:3001";

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL_API}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro desconhecido";
  }
};
