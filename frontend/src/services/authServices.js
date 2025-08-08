// src/services/authServices.js
import api from "./api";

export const registerUser = async (data) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/login", data);
  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

