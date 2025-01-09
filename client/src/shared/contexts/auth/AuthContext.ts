import { RegisterUserProps } from "@shared/types/auth.types";
import { ErrorResponseTypes } from "@shared/types/error.types";
import { createContext } from "react";

interface LoginProps {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface AuthContextProps {
  isLoggedIn: boolean;
  authError: ErrorResponseTypes | null;
  login: (credentials: LoginProps) => Promise<void>;
  logout: () => Promise<void>;
  register: (newUserInfo: RegisterUserProps) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
