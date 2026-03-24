import { apiClient } from "./client";

export const getPosts = async () => {
  const response = await apiClient.get("/posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

export const getPostComments = async (id) => {
  const response = await apiClient.get(`/posts/${id}/comments`);
  return response.data;
};

export const createPost = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("country", data.country);
  formData.append("city", data.city);

  if (data.photo) {
    formData.append("photo", data.photo);
  }

  const response = await apiClient.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};