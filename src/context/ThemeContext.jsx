import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState("dark");

  const updateThemeMode = (newMode) => {
    if (newMode === "light" || newMode === "dark") {
      setThemeMode(newMode);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        updateThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
