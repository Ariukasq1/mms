import React, { createContext, useState } from "react";

export const MenuContext = createContext();

// This context provider is passed to any component requiring the context
export const MenuProvider = ({ children }) => {
  return (
    <MenuContext.Provider
      value={{
        menu,
        setMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
