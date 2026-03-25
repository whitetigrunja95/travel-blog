import { apiClient } from "./client";

export const getCommentsByPostId = async (postId) => {
  const response = await apiClient.get(`/posts/${postId}/comments`);
  return response.data;
};

export const createComment = async (postId, data) => {
  const response = await apiClient.post(`/posts/${postId}/comments`, {
    full_name: data.fullName,
    comment: data.comment,
  });

  return response.data;
};