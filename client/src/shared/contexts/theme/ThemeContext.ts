import { createContext } from "react";
import { darkTheme } from "./themes";

export interface Theme {
  name: "light" | "dark";
  colors: Record<string, string>; // to support dynamic colors
}

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>({
  theme: darkTheme,
  toggleTheme: () => {},
});
