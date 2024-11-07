// src/services/associadoService.js
import axios from "axios";

const API_URL = "http://localhost:3001/eleitores";

export const getAssociadoByMatricula = async (matricula) => {
  try {
    const response = await axios.get(`${API_URL}/${matricula}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Associado não encontrado");
    }
    throw new Error("Erro na requisição");
  }
};

export const createAssociado = async (associadoData) => {
  try {
    const response = await axios.post(API_URL, associadoData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao criar associado";
  }
};

export const updateAssociado = async (matricula, associadoData) => {
  try {
    const response = await axios.put(`${API_URL}/${matricula}`, associadoData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao atualizar associado";
  }
};

export const getAllAssociados = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar eleitores"
    );
  }
};

export const deleteAssociado = async (matricula) => {
  try {
    await axios.delete(`${API_URL}/${matricula}`);
    return "Eleitor excluído com sucesso!";
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao deletar eleitor");
  }
};

export const updateAssociadoStatus = async (matricula, status) => {
  try {
    const response = await axios.put(`${API_URL}/status`, {
      matricula,
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar status"
    );
  }
};
