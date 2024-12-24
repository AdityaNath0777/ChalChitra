import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Comment } from "../models/comment.model.js";
import { isValidObjectId, Types } from "mongoose";
import { sanitizeInput } from "../utils/securityUtils.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const { page = 1, limit = 10 } = req.query;

  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(400, "ERR :: Invalid Object Id");
  }

  const options = { page, limit };

  // const comments = await Comment.findById(videoId)
  //   .populate("owner", "fullName username avatar")
  //   .lean();

  const commentsAggregate = Comment.aggregate([
    {
      $match: {
        video: new Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",

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
      $unwind: "$owner",
    },
  ]);

  Comment.aggregatePaginate(commentsAggregate, options)
    .then((comments) => {
      return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments fetched successfully!"));
    })
    .catch((err) => {
      throw new ApiError(500, `Unable to fetch commenst ${err.message}`);
    });
});

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  const userId = req.user._id;
  const content = sanitizeInput(req.body.content).trim().slice(0, 400);

  const comment = await Comment.create({
    content,
    video: new Types.ObjectId(videoId),
    owner: new Types.ObjectId(userId),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment added successfully!"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!commentId || !isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid Comment Id");
  }

  // Authorize the user
  const comment = await Comment.findById(commentId);
  if(!comment) {
    throw new ApiError(404, "Comment does not exists");
  }
  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "User not Authorized to update this comment");
  }

  const deletedComment = await Comment.findOneAndDelete({
    _id: new Types.ObjectId(commentId),
    owner: new Types.ObjectId(req.user._id),
  }).populate("owner", "fullName username avatar").lean();

  return res
    .status(200)
    .json(new ApiResponse(200, deletedComment, "Comment deleted successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId || !isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid Comment Id");
  }

  // input sanitization
  const content = sanitizeInput(req.body.content).trim().slice(0, 400);

  // Authorize the user
  const comment = await Comment.findById(commentId);
  if(!comment) {
    throw new ApiError(404, "Comment does not exists");
  }
  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "User not Authorized to update this comment");
  }

  // update the comment
  const updatedComment = await Comment.findByIdAndUpdate(
    new Types.ObjectId(commentId),
    {
      content,
    },
    { new: true }
  ).populate("owner", "fullName username avatar").lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedComment, "Comment updated successfully!")
    );
});

export { getVideoComments, addComment, deleteComment, updateComment };
