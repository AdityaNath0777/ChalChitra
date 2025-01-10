import {
  loginUser,
  logoutUser,
  registerUser,
} from "@features/auth/services/auth.service";
import { AuthContext } from "./AuthContext";
import { LoginProps, RegisterUserProps } from "@shared/types/auth.types";
import { ReactNode, useEffect, useState } from "react";
import { apiConfig } from "@config/api.config";
import { ErrorResponseTypes } from "@shared/types/error.types";

const baseURL = apiConfig.baseURL;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState<ErrorResponseTypes | null>(null);

  const login = async (credentials: LoginProps) => {
    try {
      const loginres = await loginUser(credentials);
      console.log("login res: ", loginres);
      setIsLoggedIn(true);
      setAuthError(null);
    } catch (error) {
      console.log(error);
      setAuthError({
        status: error.response?.status || 500,
        message: error.message,
      });
    }
  };

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
  };

  const register = async (newUserInfo: RegisterUserProps) => {
    await registerUser(newUserInfo);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // let's use fetch here for simplicity and to don't forget it's syntax
        const res = await fetch(`${baseURL}/users/current-user`, {
          credentials: "include",
        });
        console.log("auth check loggedin: ", res);

        if (!res.ok) {
          return;
        }

        setIsLoggedIn(true);
      } catch (error) {
        console.error("user not logged in");
      }
    };

    if (!isLoggedIn) {
      checkLoggedIn();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, authError, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
