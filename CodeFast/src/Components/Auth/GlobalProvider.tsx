import { createContext, useContext } from "react";
import React, { useState } from "react";

const GlobalContext = createContext<any>(null);

export const useGlobalContext = () => {
  const context = useContext<any>(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
};

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
