import { ErrorResponseTypes } from "@shared/types/error.types";
import { useEffect, useState } from "react";
import { getUserTweets } from "../services/tweet.services";

interface TweetResponse {
  _id: string;
  content: string;
  owner: string;
  replies: string[];
  createdAt: string;
  updatedAt: string;
  _v: boolean;
}

export const useFetchTweets = (userId: string) => {
  const [tweets, setTweets] = useState<TweetResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponseTypes | null>(null);

  const fetchTweets = async (userId: string) => {
    getUserTweets(userId)
      .then((res) => {
        console.log(res.data);
        setTweets(res.data);
        return res.data;
      })
      .catch((error) => console.error(`${error.message}`))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchTweets(userId);
  }, [userId]);

  const updateTweetList = async () => {
    console.log("calling fetch tweets inside update tweet list");
    await fetchTweets(userId);
    console.log("tweets in hooks: ", tweets);
  };

  const removeTweet = (tweetId: string) => {
    if (tweets) {
      setTweets((prev) =>
        prev ? prev.filter((tweet) => tweet._id !== tweetId) : null
      );
    }
  };

  return { tweets, loading, error, removeTweet, updateTweetList };
};
