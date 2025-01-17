import { isValidObjectId, Types } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

/**
 * to fetch the channels subscribed by the current channel
 */
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!channelId || !isValidObjectId(channelId)) {
    throw new ApiError(400, "ERR :: Invalid Channeld Id");
  }

  // Verify channel existence
  const channelExists = await User.exists({ _id: channelId });
  if (!channelExists) {
    throw new ApiError(404, "ERR :: Channel Not Found");
  }

  const subscribedChannels = await Subscription.aggregate([
    {
      $match: {
        subscriber: new Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "subscribedTo",

        pipeline: [
          {
            $project: {
              username: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscribedTo",
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedChannels,
        "Subscribed Channels of the current channel has been fetched successfully"
      )
    );
});

/**
 * to subscriber or unsubscribe the subscription
 */
const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = new Types.ObjectId(req.user._id);

  if (!channelId || !isValidObjectId(channelId)) {
    throw new ApiError(404, "ERR :: Invalid Channel Id");
  }

  const existingSubscription = await Subscription.findOne({
    channel: new Types.ObjectId(channelId),
    subscriber: userId,
  });

  let result = "";

  if (!existingSubscription) {
    // if not subcribed already -> subscribe
    await Subscription.create({
      channel: new Types.ObjectId(channelId),
      subscriber: userId,
    });

    result = "subscribed";
  } else {
    // remove subscription
    await Subscription.findByIdAndDelete(existingSubscription._id);
    result = "unsubscribed";
  }

  return res
    .status(200)
    .json(new ApiResponse(200, `Channel ${result} Successfully!`));
});

/**
 * to fetch the channels which have subscribed to the current user
 */
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userSubscribers = await Subscription.aggregate([
    {
      $match: {
        channel: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",

        pipeline: [
          {
            $project: {
              fullName: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscriber"
    }
  ]).catch((err) => {
    console.error(`ERR :: user subscribers :: ${err.message}`);
    throw new ApiError(500, "Something went wrong!");
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userSubscribers,
        "Subscribers of your channel has been fetched successfully"
      )
    );
});

/**
 * to fetch the channels subsribed by current user
 */
const getUserSubsrciptions = asyncHandler(async (req, res) => {
  const userId = new Types.ObjectId(req.user._id);

  const userSubscriptions = await Subscription.aggregate([
    {
      $match: {
        subscriber: userId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "subscribedTo",

        pipeline: [
          {
            $project: {
              fullName: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscribedTo"
    }
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userSubscriptions,
        "User subscriptions fetched successfully!"
      )
    );
});

const isSubscribedTo = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const { user } = req;

  const isSubscribed = await Subscription.findOne({
    subscriber: new Types.ObjectId(user),
    channel: new Types.ObjectId(channelId),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        isSubscribed,
        `User had ${isSubscribed ? "subscribed" : "not subscribed"} to this channel`
      )
    );
});

export {
  toggleSubscription,
  getSubscribedChannels,
  getUserChannelSubscribers,
  getUserSubsrciptions,
  isSubscribedTo,
};
