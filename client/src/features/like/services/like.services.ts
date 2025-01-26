import { apiConfig } from "@config/api.config";
import axios from "axios";

const likesEndpoint = `${apiConfig.baseURL}/likes`;
const { config } = apiConfig;

const getLikedContent = async (userId: string) => {
  try {
    const url = `${likesEndpoint}/users/:${userId}`;
    const res = await axios.get(url, config);

    console.log("get liked content res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to fetch all liked content :: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch Liked Contents: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const getLikedContentByType = async (userId: string, contentType: string) => {
  try {
    const url = `${likesEndpoint}/users/:${userId}/:${contentType}`;
    const res = await axios.get(url, config);

    console.log("get liked content by type res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to fetch all liked content by type :: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch Liked Contents by type: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const getUserLikes = async () => {
  try {
    const url = `${likesEndpoint}/users/me`;
    const res = await axios.get(url, config);

    console.log("get liked content of current user res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to fetch all liked content of current user :: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch Liked Contents of current user: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const getUserLikedContentByType = async (contentType: string) => {
  try {
    const url = `${likesEndpoint}/users/me/:${contentType}`;
    const res = await axios.get(url, config);

    console.log("get liked content of current user by type res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to fetch all liked content of current user by type :: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch Liked Contents of current user by type: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const toggleLike = async (contentId: string) => {
  try {
    const url = `${likesEndpoint}/toggle/content/:${contentId}`;
    const res = await axios.get(url, config);

    console.log("toggle like res: ", res.data);

    if (!res.data.success) {
      throw new Error(`ERR :: toggle like :: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to toggle like: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export {
  getLikedContent,
  getLikedContentByType,
  getUserLikes,
  getUserLikedContentByType,
  toggleLike,
};
