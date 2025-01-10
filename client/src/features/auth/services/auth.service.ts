import axios from "axios";
import { LoginProps, RegisterUserProps } from "../types/auth.types";
import { apiConfig } from "@config/api.config";

const BASE_URL = `${apiConfig.baseURL}/users`;

const loginUser = async (userData: LoginProps) => {
  try {
    const url = `${BASE_URL}/login`;
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // include cookies for authenticatiion
    };

    const response = await axios.post(url, userData, config);
    console.log("Login response: ", response);

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
};

const logoutUser = async () => {
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
};

const registerUser = async (newUserInfo: RegisterUserProps) => {
  try {
    const url = `${BASE_URL}/register`;
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredential: true,
    };

    const formData = new FormData();

    // Append regular fields
    formData.append("fullName", newUserInfo.fullName);
    formData.append("email", newUserInfo.email);
    formData.append("username", newUserInfo.username);
    formData.append("password", newUserInfo.password);

    if (newUserInfo.avatar) {
      formData.append("avatar", newUserInfo.avatar); // Use the file object directly
    }
    if (newUserInfo.coverImage) {
      formData.append("coverImage", newUserInfo.coverImage); // Use the file object directly
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
};

const fetchCurrentUser = async () => {
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
};

export { loginUser, logoutUser, registerUser, fetchCurrentUser };
