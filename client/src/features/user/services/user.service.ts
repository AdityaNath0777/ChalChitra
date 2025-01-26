import axios from "axios";
import { UpdateUserProps } from "../types/user.types";
import { apiConfig } from "@config/api.config";

const usersEndpoint = `${apiConfig.baseURL}/users`;
const { config } = apiConfig;

const updateUserDetails = async (userInfo: UpdateUserProps) => {
  try {
    const url = `${usersEndpoint}/update-account`;

    const res = await axios.patch(url, userInfo, config);

    if (!res.data.success) {
      throw new Error(`Error while updating user: ${res.data.message}`);
    }

    return res.data.data;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Error while updating user: ${error.message}`);
  }
};

const fetchCurrentUserDetails = async () => {
  try {
    const url = `${usersEndpoint}/current-user`;

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

/**
 *
 * @param userId
 *
 * @Todo : Replace the dummy logic with correct logic
 * @returns
 */
const fetchUserDetailsById = async (userId: string) => {
  console.log(userId);
  try {
    const url = `${usersEndpoint}/current-user`;

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

// async fetchUserByUsername(username: string) {},

export { updateUserDetails, fetchCurrentUserDetails, fetchUserDetailsById };
