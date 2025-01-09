import { UpdateUserProps, User } from "@shared/types/user.types";
import { createContext } from "react";

interface UserContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateUser: (userInfo: UpdateUserProps) => Promise<void>;
  // fetchUserById: (userId: string) => Promise<void>;
  // fetchUserByUsername: (username: string) => Promise<void>;
}

export const UserContext = createContext<UserContextProps | null>(null);
