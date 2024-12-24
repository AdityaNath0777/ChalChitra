import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likeable: {
      type: Schema.Types.ObjectId,
      ref: "likeableType",
      required: true,
    },
    likeableType: {
      type: Schema.Types.ObjectId,
      enum: ["Video", "Comment", "Tweet", "Reply"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model("Like", likeSchema);
