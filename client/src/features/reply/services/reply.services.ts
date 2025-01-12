import { apiConfig } from "@config/api.config";
import axios from "axios";

const repliesEndpoint = `${apiConfig.baseURL}/replies`;
const { config } = apiConfig;

const getReply = async (replyId: string) => {
  try {
    const res = await axios.get(`${repliesEndpoint}/:${replyId}`, config);
    console.log("get reply res: ", res.data);

    if (!res.data.success) {
      throw new Error(`ERR :: Unable to fetch reply: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch reply: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
const updateReply = async (replyId: string, content: string) => {
  try {
    const res = await axios.patch(
      `${repliesEndpoint}/:${replyId}`,
      content,
      config
    );
    console.log("get reply res: ", res.data);

    if (!res.data.success) {
      throw new Error(`ERR :: Unable to fetch reply: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch reply: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
const deleteReply = async (replyId: string) => {
  try {
    const res = await axios.delete(`${repliesEndpoint}/:${replyId}`, config);
    console.log("delete reply res: ", res.data);

    if (!res.data.success) {
      throw new Error(`ERR :: Unable to delete reply: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to delete reply: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const getUserReplies = async () => {
  try {
    const res = await axios.get(`${repliesEndpoint}/users/me`, config);
    console.log("get user replies res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to fetch users replies: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch users replies: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
const getOtherUserReplies = async (userId: string) => {
  try {
    const res = await axios.get(`${repliesEndpoint}/users/:${userId}`, config);
    console.log("get other users replies res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to fetch other users replies: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch other users replies: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const createReply = async (contentId: string) => {
  try {
    const res = await axios.post(
      `${repliesEndpoint}/content/:${contentId}/replies`,
      config
    );
    console.log("create reply res: ", res.data);

    if (!res.data.success) {
      throw new Error(`ERR :: Unable to create reply: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to create reply: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
const getContentReplies = async (contentId: string) => {
  try {
    const res = await axios.get(
      `${repliesEndpoint}/content/:${contentId}/replies`,
      config
    );
    console.log("get content replies res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to fetch content replies: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch content replies: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export {
  createReply,
  deleteReply,
  getContentReplies,
  getOtherUserReplies,
  getReply,
  getUserReplies,
  updateReply,
};
