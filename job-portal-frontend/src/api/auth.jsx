// src/api/auth.js
import axiosClient from "../api/axiosClient"; // your singleton axios

export const register = (payload) =>
  axiosClient.post("/auth/register", payload);

export const login = (payload) => axiosClient.post("/auth/login", payload);
export const logout = () => {
  localStorage.removeItem("auth");
  window.dispatchEvent(new Event("storage"));
  return axiosClient.post("/auth/logout");
};
