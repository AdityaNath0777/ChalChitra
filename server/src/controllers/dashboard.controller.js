import { isValidObjectId, Types } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";
import { Like } from "../models/like.model.js";

const getSubsriberCount = async (channelId) => {
  const data = Subscription.aggregate([
    {
      $match: { channel: new Types.ObjectId(channelId) },
    },
    {
      $group: { _id: null, subsCount: { $sum: 1 } },
    },
    {
      $project: { subsCount: 1 },
    },
  ]);

  return data;
};

const getVideosCount = async (channelId) => {
  const data = await Video.aggregate([
    { $match: { owner: new Types.ObjectId(channelId) } },
    { $group: { _id: null, videoCount: { $sum: 1 } } },
  ]);

  return data;
};

const getLikesCount = async (channelId) => {
  const data = await Like.aggregate([
    {
      $match: { likedBy: new Types.ObjectId(channelId) },
    },
    {
      $group: { _id: null, likeCount: { $sum: 1 } },
    },
  ]);

  return data;
};

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const { channelId } = req.params;

  if (!channelId || !isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Channel Id");
  }

  const subscriberCount = await getSubsriberCount(channelId);
  const videosCount = await getVideosCount(channelId);
  // const viewsCount = await getViewCount(channelId);
  const totalLikesCount = await getLikesCount(channelId);

  let channelStats = {
    subscriberCount: subscriberCount[0].subsCount,
    videosCount: videosCount[0].videoCount,
    totalLikesCount: totalLikesCount[0].likeCount,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, channelStats, "Channel stats fetched successfully")
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const { channelId } = req.params;
  const { page, limit, sort, order } = req.query;

  if (!channelId || !isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Channel Id");
  }

  const options = {
    page: page || 1,
    limit: limit || 10,
    // sort: ()
  };

  const videos = await Video.aggregatePaginate(
    [
      {
        $match: { owner: new Types.ObjectId(channelId) },
      },
    ],
    options
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, videos, "Channels' videos fetched successfully")
    );
});

export { getChannelStats, getChannelVideos };
