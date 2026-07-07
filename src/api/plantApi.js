import api from "./axios";

export const getPlants = async () => {
  const response = await api.get("/api/plants");
  return response.data.data;
};

export const addPlant = async (plantData) => {
  const response = await api.post("/api/plants", plantData);
  return response.data.data;
};