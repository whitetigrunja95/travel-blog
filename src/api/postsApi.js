import { apiClient } from "./client";

export const getPosts = async () => {
  const response = await apiClient.get("/posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("country", data.country);
  formData.append("city", data.city);

  if (data.photo instanceof File) {
    formData.append("photo", data.photo, data.photo.name);
  }

  const response = await apiClient.post("/posts", formData);
  return response.data;
};