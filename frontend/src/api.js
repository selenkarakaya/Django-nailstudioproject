import axios from "axios";
const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Create an Axios instance with base URL and credentials enabled
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

// Axios response interceptor: Handle token expiration and refresh the token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await api.post("/token/refresh/", {}); // backend: /api/token/refresh/
        return api(error.config);
      } catch {
        // refresh fail -> logout/redirect
      }
    }
    return Promise.reject(error);
  }
);

export default api;
