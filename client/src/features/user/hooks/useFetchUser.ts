import { useEffect, useState } from "react";
import { User } from "../types/user.types";
// import { ErrorResponse } from "@shared/types/error.types";
import { fetchUserDetailsById } from "../services/user.service";

export const useFetchUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [error, setError] = useState<ErrorResponse | null>(null);

  // useEffect(()=>{},[userId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserDetailsById(userId);
        setUser(userData);
      } catch (error) {
        console.error(`Unable to fetch the user :: ERR :: `, error.message);
        setError("Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};
