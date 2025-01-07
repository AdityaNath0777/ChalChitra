import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

// custom hook for using theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useTheme hook must be used within a ThemeProvider");

  return context;
};
