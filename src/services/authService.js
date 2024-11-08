import axios from "axios";

const BASE_URL_API = "http://ec2-54-163-88-195.compute-1.amazonaws.com:3001";

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL_API}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro desconhecido";
  }
};
