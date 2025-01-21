// src/context/UserContext.js

import React, { createContext, useState, useEffect } from "react";
import api from "../api";

// UserContext ve UserProvider component'i oluşturuyoruz
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("profile/", { withCredentials: true });
        setUser(response.data); // Kullanıcıyı veri ile set ediyoruz
      } catch (error) {
        setUser(null); // Hata oluşursa kullanıcıyı null yapıyoruz
      }
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
