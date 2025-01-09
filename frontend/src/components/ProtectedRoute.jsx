// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import api from "../api";
// import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
// import { useState, useEffect } from "react";

// function ProtectedRoute({ children }) {
//   const [isAuthorized, setIsAuthorized] = useState(null);

//   useEffect(() => {
//     auth().catch(() => setIsAuthorized(false));
//   }, []);

//   const refreshToken = async () => {
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//     try {
//       const res = await api.post("/api/token/refresh/", {
//         refresh: refreshToken,
//       });
//       if (res.status === 200) {
//         localStorage.setItem(ACCESS_TOKEN, res.data.access);
//         setIsAuthorized(true);
//       } else {
//         setIsAuthorized(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setIsAuthorized(false);
//     }
//   };

//   const auth = async () => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (!token) {
//       setIsAuthorized(false);
//       return;
//     }
//     const decoded = jwtDecode(token);
//     const tokenExpiration = decoded.exp;
//     const now = Date.now() / 1000;

//     if (tokenExpiration < now) {
//       await refreshToken();
//     } else {
//       setIsAuthorized(true);
//     }
//   };

//   if (isAuthorized === null) {
//     return <div>Loading...</div>;
//   }

//   return isAuthorized ? children : <Navigate to="/login" />;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import api from "../api"; // Axios instance
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  // Cookie'den token alma fonksiyonu
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  // Token yenileme fonksiyonu
  const refreshToken = async () => {
    const refreshToken = getCookie("refresh_token"); // Refresh token cookie'den alınır
    if (!refreshToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        // Access token'ı cookie'ye yeniden yaz
        document.cookie = `access_token=${res.data.access}; HttpOnly; Path=/; Secure`;
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log("Token yenileme hatası:", error);
      setIsAuthorized(false);
    }
  };

  // Kullanıcı yetkisini kontrol eden fonksiyon
  const auth = async () => {
    const token = getCookie("access_token"); // Access token cookie'den alınır
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    // Token'ın süresi dolduysa yenile
    const payload = JSON.parse(atob(token.split(".")[1])); // Token payload'ı çözülür
    const tokenExpiration = payload.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Yüklenme durumunu göster
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
