import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

// This context provider is passed to any component requiring the context
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};