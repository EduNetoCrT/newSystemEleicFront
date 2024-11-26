import api from "./api";

// Criar uma nova presença
export const createPresenca = async (data) => {
  try {
    
    const response = await api.post("/presencas", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao registrar a presença");
  }
};

// Obter todas as presenças
export const getAllPresencas = async () => {
  try {
    const response = await api.get("/presencas");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao obter presenças");
  }
};

// Obter presença de um eleitor pelo ID ou matrícula
export const getPresencaByEleitorId = async (id) => {
  try {
    const response = await api.get(`/eleitor/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar presença do eleitor");
  }
};

// Obter contagem de presenças por sessão
export const getPresencaCountBySessao = async () => {
  try {
    const response = await api.get("/presencas/contagem-por-sessao");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao obter contagem de presenças por sessão");
  }
};
