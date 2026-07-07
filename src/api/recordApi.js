import api from "./axios";

export const saveRecord = async (plantId, recordDate, recordData) => {
  const response = await api.put(
    `/api/plants/${plantId}/records/${recordDate}`,
    recordData
  );

  return response.data.data;
};

export const getRecord = async (plantId, recordDate) => {
  const response = await api.get(
    `/api/plants/${plantId}/records/${recordDate}`
  );

  return response.data.data;
};