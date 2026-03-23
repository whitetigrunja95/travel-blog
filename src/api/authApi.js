import { apiClient } from "./client";

export const registerUser = async (data) => {
  const response = await apiClient.post("/register", {
    email: data.email,
    password: data.password,
  });

  return response.data;
};

export const loginUser = async (data) => {
  const response = await apiClient.post("/login", {
    email: data.email,
    password: data.password,
  });

  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.get("/logout");
  return response.data;
};