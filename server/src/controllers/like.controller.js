import { isValidObjectId, Types } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  CommentLike,
  ReplyLike,
  TweetLike,
  VideoLike,
  Like,
} from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sanitizeInput } from "../utils/securityUtils.js";

/**
 * Modular Schema Approach
 */
const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  const deletedLiked = await VideoLike.findOneAndDelete({
    likedBy: req.user._id,
    video: new Types.ObjectId(videoId),
  });

  let result = deletedLiked ? "unliked" : "liked";
  if (!deletedLiked) {
    const newLike = new VideoLike({
      likedBy: req.user._id,
      video: new Types.ObjectId(videoId),
    });

    await newLike.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, `Video ${result} successfully!`));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!commentId || !isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid Comment Id");
  }

  const deletedLike = await CommentLike.findOneAndDelete({
    likedBy: req.user._id,
    comment: new Types.ObjectId(commentId),
  });

  const result = deletedLike ? "unliked" : "liked";
  if (!deletedLike) {
    const newLike = new CommentLike({
      likedBy: req.user._id,
      comment: new Types.ObjectId(commentId),
    });

    await newLike.save();
  }
  return res
    .status(200)
    .json(new ApiResponse(200, `Comment ${result} successfully`));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId || !isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid Tweet Id");
  }

  const deletedLike = await TweetLike.findOneAndDelete({
    likedBy: req.user._id,
    tweet: new Types.ObjectId(tweetId),
  });

  const result = deletedLike ? "unliked" : "liked";
  if (!deletedLike) {
    const newLike = new TweetLike({
      likedBy: req.user._id,
      tweet: new Types.ObjectId(tweetId),
    });

    await newLike.save();
  }
  return res
    .status(200)
    .json(new ApiResponse(200, `Tweet ${result} successfully`));
});

const toggleReplyLike = asyncHandler(async (req, res) => {
  const { replyId } = req.params;

  if (!replyId || !isValidObjectId(replyId)) {
    throw new ApiError(400, "Invalid Reply Id");
  }

  const deletedLike = await ReplyLike.findOneAndDelete({
    likedBy: req.user._id,
    reply: new Types.ObjectId(replyId),
  });

  const result = deletedLike ? "unliked" : "liked";
  if (!deletedLike) {
    const newLike = new ReplyLike({
      likedBy: req.user._id,
      reply: new Types.ObjectId(replyId),
    });

    await newLike.save();
  }
  return res
    .status(200)
    .json(new ApiResponse(200, `Reply ${result} successfully`));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const likedVideos = await VideoLike.aggregate([
    {
      $match: {
        likedBy: userId,
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",

        pipeline: [
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              thumbnailFile: 1,
              owner: 1,
              isPublished: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$video",
    },
    {
      $group: {
        _id: "$likedBy",
        likedBy: { $first: "$likedBy" },
        likedVideos: { $push: "$video" },
        likeCount: { $sum: 1 },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Liked Videos fetched successfully!")
    );
});

const getLikedTweets = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const likedTweets = await TweetLike.aggregate([
    {
      $match: {
        likedBy: userId,
      },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "tweet",
        foreignField: "_id",
        as: "tweet",

        pipeline: [
          {
            $project: {
              content: 1,
              owner: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$tweet",
    },
    {
      $group: {
        _id: "$likedBy",
        likedTweets: { $push: "$tweet" },
        likeCount: { $sum: 1 },
        likedBy: { $first: "$likedBy" },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedTweets, "Liked Tweets fetched successfully!")
    );
});

/**
 * Singular Like Schema for all the Content-Type
 */
/**
 * TODO: Authorize before deleting
 */
const toggleLike = asyncHandler(async (req, res) => {
  const { contentId } = req.params;
  const { contentType } = req.body;

  const contentTypeArray = ["Video", "Tweet", "Comment", "Reply"];
  if (!contentType || !contentTypeArray.includes(contentType)) {
    throw new Error(400, "Invalid content type");
  }

  if (!contentId || !isValidObjectId(contentId)) {
    throw new ApiError(400, `Invalid ${contentType} Id`);
  }

  const existinglike = await Like.findOne({
    likedBy: req.user._id,
    likeable: new Types.ObjectId(contentId),
    likeableType: contentType,
  });

  if (existinglike) {
    const like = await Like.findByIdAndDelete(existinglike._id);

    return res
      .status(200)
      .json(new ApiResponse(200, like, `${contentType} unliked successfully!`));
  }

  const newLike = new Like({
    likedBy: req.user._id,
    likeable: new Types.ObjectId(contentId),
    likeableType: contentType,
  });
  await newLike.save();

  return res
    .status(200)
    .json(new ApiResponse(200, newLike, `${contentType} liked successfully!`));
});

const fetchLikedContent = async (userId) => {
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  const likedContent = await Like.aggregate([
    {
      $match: {
        likedBy: userId,
      },
    }, // [ all the liked content ]

    // Stage 2: Group by id and type
    {
      $group: {
        _id: {
          likeable: "$likeable",
          likeableType: "$likeableType",
        },
        likeCount: { $sum: 1 },
      },
    },
    // [groups]

    // Stage 3: filtering using subpipelines
    {
      $facet: {
        // sub-pipeline for video type
        videos: [
          {
            $match: { $expr: { $eq: ["$_id.likeableType", "Video"] } },
          },
          {
            $lookup: {
              from: "videos",
              localField: "likeable",
              foreignField: "_id",
              pipeline: [
                {
                  $project: { _id: 1, title: 1, thumbnail: 1, owner: 1 },
                },
              ],
              as: "videoInfo",
            },
          },
          {
            $unwind: "$videoInfo",
          },
        ],

        tweets: [
          {
            $match: { $expr: { $eq: ["$_id.likeableType", "Tweet"] } },
          },
          {
            $lookup: {
              from: "tweets",
              localField: "_id.likeable",
              foreignField: "_id",
              pipeline: [
                {
                  $project: { _id: 1, owner: 1, content: 1 },
                },
              ],
              as: "tweetInfo",
            },
          },
          {
            $unwind: "$tweetInfo",
          },
        ],

        comments: [
          {
            $match: { $expr: { $eq: ["$_id.likeableType", "Comment"] } },
          },
          {
            $lookup: {
              from: "comments",
              localField: "likeable",
              foreignField: "_id",
              pipeline: [
                {
                  $project: { _id: 1, content: 1, owner: 1 },
                },
              ],
              as: "commentInfo",
            },
          },
          {
            $unwind: "$commentInfo",
          },
        ],

        replies: [
          {
            $match: { $expr: { $eq: ["$_id.likeableType", "Reply"] } },
          },
          {
            $lookup: {
              from: "replies",
              localField: "likeable",
              foreignField: "_id",
              pipeline: [
                {
                  $project: { _id: 1, content: 1, owner: 1 },
                },
              ],
              as: "replyInfo",
            },
          },
          {
            $unwind: "$replyInfo",
          },
        ],
      },
    },
    {
      $project: {
        videos: 1,
        tweets: 1,
        replies: 1,
        totalLikeCount: {
          $sum: [
            "$videos.likeCount",
            "$tweets.likeCount",
            "$replies.likeCount",
          ],
        },
        videoLikeCount: { $sum: "$videos.likeCount" },
        tweetLikeCount: { $sum: "$tweets.likeCount" },
        replyLikeCount: { $sum: "$replies.likeCount" },
      },
    },
  ]);

  return likedContent;
};

const getLikedContent = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User Id");
  }

  const likedContent = await fetchLikedContent(userId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likedContent,
        "User's Liked Content fetched successfully!"
      )
    );
});

const getUserLikes = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const likedContent = await fetchLikedContent(userId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likedContent,
        "User's Liked Content fetched successfully!"
      )
    );
});

const fetchUserLikedContentByType = async (uId, contentType) => {
  if (!uId || !isValidObjectId(uId)) {
    throw new ApiError(400, "Inavlid User Id");
  }

  if (!["Video", "Comment", "Tweet", "Reply"].includes(contentType)) {
    throw new ApiError(400, "Invalid Content Type");
  }

  const userId = new Types.ObjectId(uId);

  const likedByType = await Like.aggregate([
    {
      $match: {
        likedBy: new Types.ObjectId(userId),
        likeableType: contentType,
      },
    },
    {
      $group: {
        _id: "$likeableType",
        likeCount: { $sum: 1 },
        likeableIds: { $push: "$likeable" },
      },
    },
    {
      $facet: {
        // sub-pipeline for video type
        videos: [
          {
            $match: { _id: "Video" },
          },
          {
            $lookup: {
              from: "videos",
              localField: "likeable",
              foreignField: "_id",
              pipeline: [
                {
                  $project: { _id: 1, title: 1, thumbnail: 1, owner: 1 },
                },
              ],
              as: "videoInfo",
            },
          },
        ],

        tweets: [
          {
            $match: { _id: "Tweet" },
          },
          {
            $lookup: {
              from: "tweets",
              localField: "likeableIds",
              foreignField: "_id",
              pipeline: [
                {
                  $project: { _id: 1, owner: 1, content: 1 },
                },
              ],
              as: "tweetInfo",
            },
          },
        ],

        comments: [
          {
            $match: { _id: "Comment" },
          },
          {
            $lookup: {
              from: "comments",
              localField: "likeableIds",
              foreignField: "_id",
              pipeline: [
                {
                  $project: { _id: 1, content: 1, owner: 1 },
                },
              ],
              as: "commentInfo",
            },
          },
        ],

        replies: [
          {
            $match: { _id: "Reply" },
          },
          {
            $lookup: {
              from: "replies",
              localField: "likeableIds",
              foreignField: "_id",
              pipeline: [
                {
                  $project: { _id: 1, content: 1, owner: 1 },
                },
              ],
              as: "replyInfo",
            },
          },
        ],
      },
    },
    {
      $project: {
        videos: 1,
        replies: 1,
        tweets: 1,
        comments: 1,
        videoCount: { $arrayElemAt: ["$videos.likeCount", 0] },
        tweetCount: { $arrayElemAt: ["$tweets.likeCount", 0] },
        replyLikeCount: { $arrayElemAt: ["$replies.likeCount", 0] },
        likeCount: {
          $sum: [
            "$videos.likeCount",
            "$tweets.likeCount",
            "$replies.likeCount",
            "$comments.likeCount",
          ],
        },
      },
    },
  ]);

  return likedByType;
};

const getUserLikedContentByType = asyncHandler(async (req, res) => {
  const { contentType } = req.params;
  const userId = req.user._id;

  const likedByType = await fetchUserLikedContentByType(userId, contentType);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likedByType,
        "User's Liked Content by Type fetched successsfully!"
      )
    );
});

const getLikedContentByType = asyncHandler(async (req, res) => {
  const { contentType, userId } = req.params;

  const sanitizedContentType = sanitizeInput(contentType);
  let sanitizedUserId = sanitizeInput(userId);

  if (!sanitizedUserId) sanitizedUserId = req.user._id;

  const likedByType = await fetchUserLikedContentByType(
    sanitizedUserId,
    sanitizedContentType
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likedByType,
        "User's Liked Content by Type fetched successsfully!"
      )
    );
});

export {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  toggleReplyLike,
  getLikedVideos,
  getLikedTweets,
  toggleLike,
  getLikedContent,
  getUserLikes,
  getUserLikedContentByType,
  getLikedContentByType,
};
