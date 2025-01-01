import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sanitizeInput } from "../utils/securityUtils.js";
import { ApiError } from "../utils/ApiError.js";

const createTweet = asyncHandler(async (req, res) => {
  const content = sanitizeInput(req.body.content).trim().slice(0, 400);

  const tweet = await Tweet.create({
    content: content,
    owner: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet created successfully!"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User Id");
  }

  const tweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "user's tweets fetched successfully!"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId || !isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }

  // Authorization
  const tweet = await Tweet.findById(tweetId);
  if (!tweetId) {
    throw new ApiError(404, "Tweet does not exists");
  }
  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "User not authorized to delete this tweet");
  }

  // delete Tweet
  await Tweet.findByIdAndDelete(tweetId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Tweet deleted Successfully!"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const content = sanitizeInput(req.body.content).trim().slice(0, 400);

  const { tweetId } = req.params;

  if (!tweetId || !isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }

  if (!content.length) {
    throw new ApiError(400, "Input required to update the tweet content");
  }

  // Authorization
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet does not exists");
  }

  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "User is not authorized to modify this tweet");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      content: content,
      isEdited: true,
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet,"Tweet updated successfully!"));
});

export { createTweet, deleteTweet, getUserTweets, updateTweet };
