import api from "./api";

export const getAllSecoes = async () => {
  try {
    const response = await api.get("secoes");
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Errro"
    );
  }
}