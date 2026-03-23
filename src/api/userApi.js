import { apiClient } from "./client";

export const getCurrentUser = async () => {
  const response = await apiClient.get("/user");
  return response.data;
};