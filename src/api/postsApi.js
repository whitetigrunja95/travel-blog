import { apiClient } from "./client";

export const createPost = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("country", data.country);
  formData.append("city", data.city);
  formData.append("description", data.description);
  formData.append("image", data.photo);

  const response = await apiClient.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};