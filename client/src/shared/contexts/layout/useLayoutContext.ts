import { useContext } from "react";
import { LayoutContext } from "./LayoutContext";

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useUtilityContext must be used within UtilityProvider");
  }

  return context;
};
