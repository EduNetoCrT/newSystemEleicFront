import api from "./api";

const RESOURCE = "eleitores";

export const getAssociadoByMatricula = async (matricula) => {
  try {
    const response = await api.get(`${RESOURCE}/${matricula}`);
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
    const response = await api.post(RESOURCE, associadoData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao criar associado";
  }
};

export const updateAssociado = async (matricula, associadoData) => {
  try {
    const response = await api.put(`${RESOURCE}/${matricula}`, associadoData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao atualizar associado";
  }
};

export const getAllAssociados = async () => {
  try {
    const response = await api.get(RESOURCE);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar eleitores"
    );
  }
};

export const deleteAssociado = async (matricula) => {
  try {
    await api.delete(`${RESOURCE}/${matricula}`);
    return "Eleitor excluído com sucesso!";
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao deletar eleitor");
  }
};

// Atualização com observação para a mudança de status do associado
export const updateAssociadoStatus = async (matricula, status, observacao = "") => {
  try {
    const response = await api.put(`${RESOURCE}/status`, {
      matricula,
      status,
      observacao,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar status"
    );
  }
};
