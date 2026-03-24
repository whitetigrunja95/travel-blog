import { apiClient } from "./client";

export const getCurrentUser = async () => {
  const response = await apiClient.get("/user");
  return response.data;
};

export const updateUser = async (data) => {
  const formData = new FormData();

  if (data.fullName?.trim()) {
    formData.append("full_name", data.fullName.trim());
  }

  if (data.city?.trim()) {
    formData.append("city", data.city.trim());
  }

  if (data.country?.trim()) {
    formData.append("country", data.country.trim());
  }

  if (data.bio?.trim()) {
    formData.append("bio", data.bio.trim());
  }

  if (data.photo) {
    formData.append("photo", data.photo);
  }

  const response = await apiClient.post("/user", formData);
  return response.data;
};

export const updatePassword = async (data) => {
  const response = await apiClient.patch("/user/password", {
    password: data.password,
  });

  return response.data;
};