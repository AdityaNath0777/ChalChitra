import { createContext, useContext } from "react";

export const UserContext = createContext({

  // user
  user: {
    _id: "",                  // string
    username: "",             // string
    email: "",                // string
    avatar: "",               // string (url)
    coverImage: "",           // string (url)
    watchHistory: [""],       // string [] (ids of video)
    createdAt: "",            // string (Date)
    updatedAt: "",            // string (Date)
  },

  // error
  error: {
    status: 101,
    message: "",
  },


  // functionalities
  loginUser: async ({ email, password }) => {},
  logoutUser: async () => {},
  updateUser: async (newUser) => {},
});


// custom hook
export const useUser = () => {

  // return another Hook to make aware about context
  return useContext(UserContext)
};

export const UserProvider = UserContext.Provider;
