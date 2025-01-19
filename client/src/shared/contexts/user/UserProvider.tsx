import {
  fetchCurrentUserDetails,
  updateUserDetails,
} from "@features/user/services/user.service";
import { useAuth } from "@shared/hooks";
import { UpdateUserProps, User } from "@shared/types/user.types";
import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (userInfo: UpdateUserProps) => {
    const updatedUser = await updateUserDetails(userInfo);
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : prev));
  };

  // useEffect -> to efficiently fetch details of currently logged in user
  // whenever this component reloads
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const fetchedUser = await fetchCurrentUserDetails();

        console.log("fetched user: ", fetchedUser);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
        setError(null);
      } catch (error) {
        setError("kuch to gadbad hai re baba");
      } finally {
        setLoading(false);
      }
    };

    // only run if user is data is not available but is LoggedIn (credentials in cookies)
    console.log("userhook isLoggedIn: ", isLoggedIn);
    if (!user && isLoggedIn) {
      checkLoggedInUser();
    }

    // if not logged in or user logged out 
    // set the current user null
    if(!isLoggedIn) {
      setUser(null);
    }
  }, [isLoggedIn, user]); // only run during initial render

  return (
    <UserContext.Provider value={{ user, loading, error, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
