import { useAuthContext } from "@shared/contexts";
// import redux or any other hook

export const useAuth = () => {
  const authLib = useAuthContext; // replace that state management hook with default context api hook

  return authLib();
};
