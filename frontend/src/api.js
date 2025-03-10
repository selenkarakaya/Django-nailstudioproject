import axios from "axios";
const apiURL = "/choreo-apis/selenanailstudio/backend/v1/api/";
const VITE_API_URL = "http://localhost:8000/api/";
// Create an Axios instance with base URL and credentials enabled
const api = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

// Axios request interceptor: Automatically add the access token if available
api.interceptors.request.use(
  async (config) => {
    try {
      // Request access token from the backend
      const response = await axios.get("token/get/", {
        withCredentials: true,
      });

      if (response.data.access_token) {
        config.headers.Authorization = `Bearer ${response.data.access_token}`;
      }
    } catch (error) {
      console.error("Access token could not be retrieved");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor: Handle token expiration and refresh the token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized request, attempting to refresh token...");

      try {
        // Attempt to refresh the token using the refresh token stored in HttpOnly cookie
        await axios.post("token/refresh/", {}, { withCredentials: true });

        // Retry the original request
        return api(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed, redirecting to login...");
        // Redirect the user to the login page or handle logout
      }
    }
    return Promise.reject(error);
  }
);

export default api;
