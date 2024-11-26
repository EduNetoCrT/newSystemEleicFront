import api from "./api";

export const getAllChapas = async () => {
  try {
    const response = await api.get("chapas");
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Erro"
    );
  }
}
export const getResultados = async () => {
  try {
    const response = await api.get("resultados");

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Erro"
    );
  }
}

export const addVotes = async (votos) => {
  try {
    // Filtra votos com quantidade maior que zero
    const votosValidos = votos.filter((voto) => voto.quantidade >= 0);

    // Retorna um erro se não houver votos válidos
    if (votosValidos.length === 0) {
      throw new Error("Nenhum voto válido fornecido.");
    }

    // Envia apenas os votos válidos para a API
    const response = await api.post("votos", {
      votos: votosValidos,
    });

    return response;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Erro ao registrar votos."
    );
  }
};