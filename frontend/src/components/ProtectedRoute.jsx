import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api"; // Axios instance

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  //Function to retrieve token from the cookie.
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  //Token refresh function
  const refreshToken = async () => {
    const refreshToken = getCookie("refresh_token"); //The refresh token is retrieved from the cookie.
    if (!refreshToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        //Rewrite the access token to the cookie.
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

  //A function that checks user permissions.
  const auth = async () => {
    const token = getCookie("access_token"); //The access token is retrieved from the cookie.
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    //If the token has expired, refresh it.
    const payload = JSON.parse(atob(token.split(".")[1]));
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
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
