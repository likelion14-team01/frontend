import api from "./axios";

export const getSpecies = async () => {
  const response = await api.get("/api/species");
  return response.data.data ?? [];
};