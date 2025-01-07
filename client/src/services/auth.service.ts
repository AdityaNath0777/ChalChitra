import axios from "axios";
import { LoginInfo, RegisterInfo, UpdateUserInfo } from "../types/auth.types";

const BASE_URL = "/api/v1/users";

const authService = {
  async login(userData: LoginInfo) {
    try {
      const url = `${BASE_URL}/login`;
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // include cookies for authenticatiion
      };

      const response = await axios.post(url, userData, config);
      // console.log("Login response: ", response);

      if (!response.data.success) {
        throw new Error(`ERR :: Login Failed: ${response.data.message}`);
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging in:", error.message);
        return error;
      }
    }
  },

  async logout() {
    try {
      const url = `${BASE_URL}/logout`;
      const config = {
        withCredentials: true,
      };

      const res = await axios.post(url, config);
      console.log("logout response: ", res);

      if (!res.data.success) {
        throw new Error(`ERR :: Logout Failed: ${res.data.message}`);
      }

      // cookies are cleared through backend response
      /**
       * At backend:
       * res.clearCookie("accessToken", options)
       */

      return true;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`ERR :: Logout Failed: ${error.message}`);
    }
  },

  async updateUser(userInfo: UpdateUserInfo) {
    try {
      const url = `${BASE_URL}/update-account`;
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const res = await axios.patch(url, userInfo, config);

      if (!res.data.success) {
        throw new Error(`Error while updating user: ${res.data.message}`);
      }

      return res.data.data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error while updating user: ${error.message}`);
    }
  },

  async registerUser(signinInfo: RegisterInfo) {
    try {
      const url = `${BASE_URL}/register`;
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredential: true,
      };

      const formData = new FormData();

      // Append regular fields
      formData.append("fullName", signinInfo.fullName);
      formData.append("email", signinInfo.email);
      formData.append("username", signinInfo.username);
      formData.append("password", signinInfo.password);

      if (signinInfo.avatar) {
        formData.append("avatar", signinInfo.avatar); // Use the file object directly
      }
      if (signinInfo.coverImage) {
        formData.append("coverImage", signinInfo.coverImage); // Use the file object directly
      }

      const res = await axios.post(url, formData, config);

      if (!res.data.success) {
        throw new Error(
          `ERR :: Unable to register new User: ${res.data.message}`
        );
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`ERR :: Unable to register new User: ${error.message}`);
      }

      return false;
    }
  },

  async fetchCurrentUser() {
    try {
      const url = `${BASE_URL}/current-user`;
      const config = {
        withCredentials: true,
      };

      const res = await axios.get(url, config);

      if (!res.data.success) {
        return null;
      }

      return res.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`ERR :: Unable to fetch current user: ${error.message}`);
      }
      return null;
    }
  },
};

export default authService;
