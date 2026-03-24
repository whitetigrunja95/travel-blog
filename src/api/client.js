import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export const setClientToken = (tokenValue) => {
  if (tokenValue) {
    localStorage.setItem("token", tokenValue);
  } else {
    localStorage.removeItem("token");
  }
};