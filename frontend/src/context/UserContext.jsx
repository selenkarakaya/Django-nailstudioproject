// src/context/UserContext.js

import React, { createContext, useState, useEffect } from "react";
import api from "../api";

// We are creating the UserContext and UserProvider component.
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/profile/", { withCredentials: true });
        setUser(response.data); // We are setting the user with data.
      } catch (error) {
        setUser(null); // If an error occurs, we set the user to null.
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
