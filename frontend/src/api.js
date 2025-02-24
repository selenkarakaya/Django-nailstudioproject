import axios from "axios";

// API'nin temel URL'si
// const apiUrl = "http://localhost:8000/api/"; // Backend API address

// Cookie'den belirli bir değeri almak için yardımcı fonksiyon
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
};

// Creating an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
  withCredentials: true, // Send cookies with the requests
});

// Axios Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Get the access token from the cookie
    const token = getCookie("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // If the token is invalid, we might need to refresh the token.
      console.log("Authorization error, trying to refresh the token...");
      const refreshToken = getCookie("refresh_token"); // Get the refresh token from the cookie

      try {
        const refreshResponse = await axios.post("/api/token/refresh/", {
          refresh: refreshToken,
        });

        // Save the new token in the cookies
        const newAccessToken = refreshResponse.data.access;
        document.cookie = `access_token=${newAccessToken}; path=/; secure; HttpOnly`;

        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config); // Resend the original request
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Redirect the user to the login page if the refresh token fails
      }
    }
    return Promise.reject(error);
  }
);
export default api;
