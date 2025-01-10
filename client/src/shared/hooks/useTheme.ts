import { useThemeContext } from "@shared/contexts/theme";

export const useTheme = () => {
  const themeLib = useThemeContext;

  return themeLib();
};
