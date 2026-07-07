import api from "./axios";

export const getTimeline = async (plantId) => {
  const response = await api.get(`/api/plants/${plantId}/timeline`);
  return response.data.data ?? [];
};