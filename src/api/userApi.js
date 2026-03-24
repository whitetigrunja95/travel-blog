import { apiClient } from "./client";

export const getCurrentUser = async () => {
  const response = await apiClient.get("/user");
  return response.data;
};

export const updateUser = async (data) => {
  const formData = new FormData();

  formData.append("full_name", data.fullName);
  formData.append("city", data.city);
  formData.append("description", data.about);

  if (data.photoFile) {
    formData.append("image", data.photoFile);
  }

  const response = await apiClient.post("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updatePassword = async (data) => {
  const response = await apiClient.patch("/user/password", {
    password: data.newPassword,
    password_repeat: data.repeatPassword,
  });

  return response.data;
};