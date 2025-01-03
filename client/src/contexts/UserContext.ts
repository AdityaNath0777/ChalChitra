import { createContext, useContext } from "react";
import { User } from "../types/user";
import { Error } from "../types/error";

interface LoginProps {
  email: string;
  password: string;
  rememberMe? : boolean | null;
}

interface RegisterUserProps {
  fullName: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  password: string;
  confPassword: string;
}

interface UserContextType {
  user: User | null;
  error: Error | null;
  isLoading: boolean;
  loginUser: ({ email, password }: LoginProps) => void;
  logoutUser: () => void;

  registerUser: ({
    fullName,
    username,
    email,
    avatar,
    coverImage,
    password,
  }: RegisterUserProps) => void;

  updateUser: (userData: User) => void;
}

export const UserContext = createContext<UserContextType>({
  // user
  user: null,

  // error
  error: null,

  isLoading: false,

  // functionalities
  loginUser: () => {},
  logoutUser: () => {},
  registerUser: () => {},
  updateUser: () => {},
});

// custom hook
export const useUser = () => {
  // return another Hook to make aware about context
  return useContext(UserContext);
};

export const UserProvider = UserContext.Provider;
