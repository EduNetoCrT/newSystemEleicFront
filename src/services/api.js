import axios from "axios";

// Base URL da API (vindo do .env)
const BASE_URL_API = process.env.REACT_APP_API_URL || "http://179.154.75.165:3001";

// Criação de uma instância do Axios
const api = axios.create({
    baseURL: `${BASE_URL_API}`, // Define a URL base
    headers: {
        "Content-Type": "application/json", // Configura o cabeçalho padrão
    },
});

export default api;
