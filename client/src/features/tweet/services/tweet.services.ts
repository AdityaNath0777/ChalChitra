import axios from "axios";
import { Tweet } from "../types/tweet.types";
import { apiConfig } from "@config/api.config";

const tweetsEndpoint = `${apiConfig.baseURL}/tweets`;

const { config } = apiConfig;

const createTweet = async (tweetData: Tweet) => {
  try {
    const res = await axios.post(`${tweetsEndpoint}`, tweetData, config);

    console.log("create tweet res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to create the tweet :: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while creating the tweet :: ${error.message}`);
    }
  }
};

const getUserTweets = async (userId: string) => {
  try {
    console.log("before req\t userId: ", userId, "\n type of userId: ", typeof userId);
    const res = await axios.get(`${tweetsEndpoint}/user/${userId}`, config);
    console.log("get user tweets res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to fetch the tweets:: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while fetching the tweets :: ${error.message}`);
    }
  }
};

const updateTweet = async ({
  content,
  tweetId,
}: {
  content: string;
  tweetId: string;
}) => {
  try {
    const res = await axios.patch(
      `${tweetsEndpoint}/${tweetId}`,
      { content },
      config
    );
    console.log("update tweet res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to update the tweet :: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while updating the tweet :: ${error.message}`);
    }
  }
};

const deleteTweet = async (tweetId: string) => {
  try {
    const res = await axios.delete(`${tweetsEndpoint}/${tweetId}`, config);

    console.log("delete tweet res: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to delete the tweet :: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while deleting the tweet :: ${error.message}`);
    }
  }
};

export { createTweet, getUserTweets, updateTweet, deleteTweet };
