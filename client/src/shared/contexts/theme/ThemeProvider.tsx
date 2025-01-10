import { ReactNode, useEffect, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext";
import { darkTheme, lightTheme } from "./themes";

// ThemeProvider
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) return savedTheme === "dark" ? darkTheme : lightTheme;

    // else default to system preference
    const preferDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return preferDark ? darkTheme : lightTheme;
  });

  const toggleTheme = () => {
    const newTheme = theme.name === "dark" ? lightTheme : darkTheme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme.name);
  };

  useEffect(() => {
    // apply theme class to the <html> tag
    document.documentElement.className = theme.name;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}} >
      {children}
    </ThemeContext.Provider>
  );
};