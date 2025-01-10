import { useUserContext } from "../contexts";

export const useUser = () => {
  const userLib = useUserContext;

  return userLib();
};
