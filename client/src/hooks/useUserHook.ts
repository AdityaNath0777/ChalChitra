import { useEffect, useState } from "react";
import authService from "../services/auth.service";
import { LoginInfo, RegisterInfo, UpdateUserInfo } from "../types/auth.types";
import { User } from "../types/user";
import { MyError } from "../types/error";

const useUserHook = () => {
  const [user, setUser] = useState<User | null>(null);

  const [error, setError] = useState<MyError | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const loginUser = async (loginInfo: LoginInfo) => {
    try {
      const { user: newUser } = await authService.login(loginInfo);
      setUser(newUser);
      setIsLoggedIn(true);
      setError({
        message: "",
        status: 0,
      });
    } catch (error) {
      if(error instanceof Error) {
          setError({ 
            status: 500, 
            message: error.message 
          });
      }
    }
  };

  const logoutUser = async () => {
    try {
      const isLoggedOut = await authService.logout();
  
      if (isLoggedOut) {
        setUser(null);
        setIsLoggedIn(false);
        setError(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError({
          message: error.message,
          status: 500,
        });
      }     
    }

    // try {
    //   const res = await fetch("/api/v1/users/logout", {
    //     method: "POST",
    //     credentials: "include",
    //   });

    //   if (!res.ok) {
    //     console.log("Logout Error :: ", res);
    //     throw new Error(`Logout ERROR :: ${res.status}`);
    //   }

    //   console.log("Logged Out successfully");
    //   setUser({});
    //   setIsLoggedIn(false);
    // } catch (error) {
    //   console.log("Logout failed :: ", error.message);
    // }

    // setError({
    //   message: "",
    //   status: "",
    // });
  };

  const updateUser = async (userInfo: UpdateUserInfo) => {
    console.log("before: ", userInfo);
    const updatedUser = await authService.updateUser(userInfo);
    setUser(prev => ({...prev, ...updatedUser}));
    setIsUpdating(false);
  };

  // useEffect -> to fetch details of currently logged in user
  // whenever this component reloads
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const fetchedUser = await authService.fetchCurrentUser();

      setUser(fetchedUser);
      if (fetchedUser) {
        setIsLoggedIn(true);
        setIsRegistered(true);
      }
      setError(null);
    };

    checkLoggedInUser();
  }, []);

  const registerUser = async (signinInfo: RegisterInfo) => {
    const result = await authService.registerUser(signinInfo);

    if (result) setIsRegistered(true);
  };

  return {
    user,
    error,
    isLoggedIn,
    isRegistered,
    isUpdating,
    loginUser,
    logoutUser,
    registerUser,
    updateUser,
    setIsRegistered,
    setIsUpdating,
  };
};

export default useUserHook;
