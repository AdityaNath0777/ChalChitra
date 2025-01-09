import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};