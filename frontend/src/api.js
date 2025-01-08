import axios from "axios";
// API'nin temel URL'si
const apiUrl = "http://localhost:8000/api"; // Backend API adresi

const api = axios.create({
  baseURL: apiUrl, // İsteklerin doğru URL'ye yönlendirilmesini sağlar
  withCredentials: true, // Cookie'leri otomatik göndermek için
});

// İstek öncesi özel header eklemek isterseniz
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
