import { apiClient } from "./client";

export const createComment = async (postId, data) => {
  const response = await apiClient.post(`/posts/${postId}/comments`, {
    name: data.name,
    text: data.text,
  });

  return response.data;
};