// src/api/axiosClient.js
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const axiosClient = axios.create({ baseURL: API_BASE });

// attach JWT from localStorage.auth
axiosClient.interceptors.request.use((cfg) => {
  try {
    const raw = localStorage.getItem("auth");
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) cfg.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    /* malformed json – ignore */
  }
  return cfg;
});

/* 🌟 Global response error handler */
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.message ||
      err.message ||
      "Network error – please try again.";
    // console.error("API error:", msg);
    // alert(msg);
    return Promise.reject(err);
  }
);

export default axiosClient;
