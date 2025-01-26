import { apiConfig } from "@config/api.config";
import axios from "axios";

const { config } = apiConfig;
const baseURL = `${apiConfig.baseURL}/comments`;

const addComment = async ({
  content,
  videoId,
}: {
  content: string;
  videoId: string;
}) => {
  try {
    const res = await axios.post(`${baseURL}/${videoId}`, { content }, config);
    console.log("add comment res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to add a new comment: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ERR :: Unable to add a new comment: ${error.message}`);
    }
  }
};

const getVideoComments = async (videoId: string) => {
  try {
    const res = await axios.get(`${baseURL}/${videoId}`, config);
    console.log("get video comments res: ", res.data);

    if (!res.data.success) {
      throw new Error(`ERR :: Unable to fetch comments: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ERR :: Unable to fetch comments : ${error.message}`);
    }
  }
};

const updateComment = async (commentId: string, content: string) => {
  try {
    const res = await axios.patch(
      `${baseURL}/c/${commentId}`,
      { content },
      config
    );
    console.log("update video comment res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to update the comment: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ERR :: Unable to update the comment : ${error.message}`);
    }
  }
};

const deleteComment = async (commentId: string) => {
  try {
    const res = await axios.delete(`${baseURL}/c/${commentId}`, config);
    console.log("delete video comment res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to delete the comment: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ERR :: Unable to delete the comment : ${error.message}`);
    }
  }
};

export { addComment, getVideoComments, updateComment, deleteComment };
