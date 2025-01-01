import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    likeable: {
      type: Schema.Types.ObjectId,
      refPath: "likeableType",
      required: [true, "Likeable is required"],
    },
    likeableType: {
      type: String,
      enum: ["Video", "Comment", "Tweet", "Reply"],
      required: [true, "Likeable type is required"],
    },
  },
  { timestamps: true }
);

likeSchema.index({ likeable: 1, likeableType: 1 });
export const Like = mongoose.model("Like", likeSchema);

const videoLikeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  { timestamps: true }
);

export const VideoLike = mongoose.model("VideoLike", videoLikeSchema);

const commentLikeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentLike = mongoose.model("CommentLike", commentLikeSchema);

const tweetLikeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },
  },
  { timestamps: true }
);

export const TweetLike = mongoose.model("TweetLike", tweetLikeSchema);

const replyLikeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reply: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
      required: true,
    },
  },
  { timestamps: true }
);

export const ReplyLike = mongoose.model("ReplyLike", replyLikeSchema);
