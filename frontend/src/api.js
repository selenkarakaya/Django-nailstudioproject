import axios from "axios";
const apiUrl =
  "https://3d6a7f2f-be99-4a88-b829-f0a231a33b3e-dev.e1-eu-north-azure.choreoapis.dev/selenanailstudio/backend/v1.0/";
// Create an Axios instance with base URL and credentials enabled
const api = axios.create({
  baseURL:
    "https://3d6a7f2f-be99-4a88-b829-f0a231a33b3e-dev.e1-eu-north-azure.choreoapis.dev/selenanailstudio/backend/v1.0",
  withCredentials: true, // Ensures cookies are sent with requests
});

// Axios request interceptor: Automatically add the access token if available
api.interceptors.request.use(
  async (config) => {
    try {
      // Request access token from the backend
      const response = await axios.get("/api/token/get/", {
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
        await axios.post("/api/token/refresh/", {}, { withCredentials: true });

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
