import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api"; // Axios instance with credentials

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  // Function to check authentication status via the backend
  const verifyAuth = async () => {
    try {
      const res = await api.get("/token/verify/", {
        withCredentials: true,
      });

      if (res.data.isAuthenticated) {
        setIsAuthorized(true); // User is authenticated
      } else {
        setIsAuthorized(false); // User is not authenticated
      }
    } catch (error) {
      setIsAuthorized(false); // On error, assume not authenticated
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
