import api from "./axios";

export const uploadPhoto = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/api/photos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};