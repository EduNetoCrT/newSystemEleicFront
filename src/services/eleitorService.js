import api from "./api";

// Obter todos os eleitores
export const getAllEleitores = async () => {
    try {
        const response = await api.get("/eleitores");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao obter eleitores");
    }
};

// Obter um eleitor específico pela matrícula
export const getEleitorByMatricula = async (matricula) => {
    try {
        const response = await api.get(`/eleitores/${matricula}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erro ao obter o eleitor pela matrícula"
        );
    }
};

// Criar um novo eleitor
export const createEleitor = async (eleitorData) => {
    try {
        const response = await api.post("/eleitores", eleitorData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao criar o eleitor");
    }
};

// Atualizar um eleitor pela matrícula
export const updateEleitor = async (matricula, eleitorData) => {
    try {
        const response = await api.put(`/eleitores/${matricula}`, eleitorData);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erro ao atualizar o eleitor"
        );
    }
};

// Excluir um eleitor pela matrícula
export const deleteEleitor = async (matricula) => {
    try {
        const response = await api.delete(`/eleitores/${matricula}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erro ao excluir o eleitor"
        );
    }
};

// Atualizar status de um eleitor
export const updateEleitorStatus = async (statusData) => {
    try {
        const response = await api.put("/eleitores/status", statusData);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erro ao atualizar o status do eleitor"
        );
    }
};
