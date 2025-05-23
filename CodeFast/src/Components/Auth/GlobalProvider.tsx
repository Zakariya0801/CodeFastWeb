import { createContext, useContext, useEffect } from "react";
import React, { useState } from "react";

export const GlobalContext = createContext<any>(null);

export const useGlobalContext = () => {
  const context = useContext<any>(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
};

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(() => {
    // Load user from localStorage when the app starts
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const dark = localStorage.getItem("DarkMode");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(dark && dark === "true" || false);
  localStorage.setItem("DarkMode", `${isDarkMode ? "true" : "false"}`);

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Clean up if user logs out
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isDarkMode,
        setIsDarkMode

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
