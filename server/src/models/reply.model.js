import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const replySchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Reply content is required"],
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner of the reply is required"],
    },
    parent: {
      type: Schema.Types.ObjectId,
      refPath: "parentType",
      required: [true, "Parent content is required"],
    },
    parentType: {
      type: String,
      enum: ["Comment", "Tweet"],
      required: [true, "Parent content type is required"],
    },
  },
  { timestamps: true }
);

// compound indexing for faster querying
replySchema.index({ parent: 1, parentType: 1 });
replySchema.plugin(mongooseAggregatePaginate);

export const Reply = mongoose.model("Reply", replySchema);

const commentReplySchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Reply content is required"],
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner of the reply is required"],
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentReply = mongoose.model("CommentReply", commentReplySchema);

const tweetReplySchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    owner: {
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

export const TweetReply = mongoose.model("TweetReply", tweetReplySchema);
