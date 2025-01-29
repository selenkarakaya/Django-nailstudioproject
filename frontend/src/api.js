import axios from "axios";

// API'nin temel URL'si
// const apiUrl = "http://localhost:8000/api/"; // Backend API adresi

// Cookie'den belirli bir değeri almak için yardımcı fonksiyon
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
};

// Axios Instance Oluşturma
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
  withCredentials: true, // Cookie'leri gönder
});

// Axios Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Access token'ı cookie'den al
    const token = getCookie("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Token'ı Authorization header'a ekle
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
      // Token geçersizse, refresh token ile yeniden token almak gerekebilir.
      console.log("Authorization error, trying to refresh the token...");

      const refreshToken = getCookie("refresh_token"); // Refresh token'ı çerezi okuyarak al

      try {
        const refreshResponse = await axios.post("/api/token/refresh/", {
          refresh: refreshToken,
        });

        // Yeni token'ı çerezlere kaydet
        const newAccessToken = refreshResponse.data.access;
        document.cookie = `access_token=${newAccessToken}; path=/; secure; HttpOnly`;

        // Orijinal isteği yeniden gönder
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config); // Yeniden istek yap
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Kullanıcıyı oturum açmaya yönlendir
      }
    }
    return Promise.reject(error);
  }
);
export default api;
