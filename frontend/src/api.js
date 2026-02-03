import axios from "axios";
const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Create an Axios instance with base URL and credentials enabled
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

// Axios request interceptor: Automatically add the access token if available
api.interceptors.request.use(
  async (config) => {
    try {
      // Request access token from the backend
      const response = await axios.get("/token/get/", {
        withCredentials: true,
      });

      if (response.data.access_token) {
        config.headers.Authorization = `Bearer ${response.data.access_token}`;
      }
    } catch (error) {}
    return config;
  },
  (error) => Promise.reject(error)
);

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
