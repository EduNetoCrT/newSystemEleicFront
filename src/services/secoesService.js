import api from "./api";

// Obter todas as seções
export const getAllSecoes = async () => {
  try {
    const response = await api.get("secoes");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao obter as seções");
  }
};

// Obter uma seção pelo ID
export const getSecaoById = async (id) => {
  try {
    const response = await api.get(`secoes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao obter a seção");
  }
};

// Criar uma nova seção
export const createSecao = async (secaoData) => {
  try {
    const response = await api.post("secoes", secaoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao criar a seção");
  }
};

// Atualizar uma seção pelo ID
export const updateSecao = async (id, secaoData) => {
  try {
    const response = await api.put(`secoes/${id}`, secaoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar a seção");
  }
};

// Excluir uma seção pelo ID
export const deleteSecao = async (id) => {
  try {
    const response = await api.delete(`secoes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao excluir a seção");
  }
};
