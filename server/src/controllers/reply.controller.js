import { isValidObjectId, Types } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Reply } from "../models/reply.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sanitizeInput } from "../utils/securityUtils.js";

const getReply = asyncHandler(async (req, res) => {
  const { replyId } = req.params;
  if (!replyId || !isValidObjectId(replyId)) {
    throw new ApiError(400, "Invalid Reply Id");
  }

  const reply = await Reply.findById(replyId)
    .populate("owner", "_id fullName username avatar")
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, reply, "Reply fetched successfully"));
});

const updateReply = asyncHandler(async (req, res) => {
  const content = sanitizeInput(req.body.content).slice(0, 400).trim();
  const { replyId } = req.params;

  const reply = await Reply.findById(replyId);
  if (reply.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "User is unauthorized to edit this reply");
  }

  const updatedReply = await Reply.findByIdAndUpdate(
    replyId,
    {
      $set: { content: content },
    },
    { new: true }
  ).populate("owner", "fullName username avatar");

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedReply, "Reply has been updated successfully!")
    );
});

const deleteReply = asyncHandler(async (req, res) => {
  const { replyId } = req.params;

  const reply = await Reply.findById(replyId);
  if (reply.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "User is unauthorized to edit this reply");
  }
  
  Reply.findByIdAndDelete(replyId)
    .then((result) => {
      return res
        .status(200)
        .json(new ApiResponse(200, result, "reply deleted successfully!"));
    })
    .catch((err) => {
      throw new ApiError(
        500,
        `Something went wrong while deleting reply :: ${err.message}`
      );
    });
});

const fetchUserReplies = async (userId, options) => {
  let filter = {};
  filter.owner = new Types.ObjectId(userId);

  // const replies = await Reply.find(filter)
  //   .sort(options.sort)
  //   .skip((options.page - 1) * options.limit)
  //   .limit(options.limit)
  //   .populate("owner", "_id fullName username avatar");

  const pipeline = [
    {
      $match: {
        owner: filter.owner,
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
  ];

  const aggReplies = await Reply.aggregatePaginate(pipeline, options);

  // return replies;
  return aggReplies;
};

const getUserReplies = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { limit, page, sort, order } = req.query;

  if (!userId || !isValidObjectId(userId)) {
    console.log(userId);
    throw new ApiError(400, "Invalid User Id");
  }

  const options = {
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    sort: {
      [sort]: order === "desc" ? -1 : 1,
    },
  };

  const replies = await fetchUserReplies(userId, options);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        replies,
        "User replies has been fetched successfully!"
      )
    );
});

const getOtherUserReplies = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { limit, page, sort, order } = req.query;

  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User Id");
  }

  const options = {
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    sort: {
      [sort]: order === "desc" ? -1 : 1,
    },
  };

  const replies = await fetchUserReplies(userId, options);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        replies,
        "Other User's replies fetched successfully!"
      )
    );
});

const createReply = asyncHandler(async (req, res) => {
  const { contentId } = req.params;
  const { content, contentType } = req.body;

  if (!contentId || !isValidObjectId(contentId)) {
    throw new ApiError(400, `Invalid ${parentType} Id`);
  }

  if (!["Comment", "Tweet"].includes(contentType)) {
    throw new ApiError(400, `${contentType} does not exists`);
  }

  const sanitizedContent = sanitizeInput(content).slice(0, 400).trim();

  const reply = await Reply.create({
    content: sanitizedContent,
    owner: req.user._id,
    parent: new Types.ObjectId(contentId),
    parentType: contentType,
  });

  const createdReply = await Reply.aggregate([
    // Stage 1: match reply id to fetch the concerned reply document
    {
      $match: {
        _id: reply._id,
      },
    },

    // Stage 2: lookup to left join the owner details into the document
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",

        pipeline: [
          {
            $project: {
              _id: 1,
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

    // Stage 3: sub-pipelines using facet to fetch reply's parent info
    {
      $facet: {
        comment: [
          {
            $match: { parentType: "Comment" },
          },
          {
            $lookup: {
              from: "comments",
              localField: "parent",
              foreignField: "_id",
              as: "comment",

              pipeline: [
                {
                  $project: {
                    _id: 1,
                    content: 1,
                    video: 1,
                    owner: 1,
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
                          _id: 1,
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
              ],
            },
          },
          {
            $unwind: "$comment",
          },
        ],
        tweet: [
          {
            $match: { parentType: "Tweet" },
          },
          {
            $lookup: {
              from: "tweets",
              localField: "parent",
              foreignField: "_id",
              as: "tweet",

              pipeline: [
                {
                  $project: {
                    _id: 1,
                    content: 1,
                    owner: 1,
                    isEdited: 1,
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
                          _id: 1,
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
              ],
            },
          },
          {
            $unwind: "$tweet",
          },
        ],
      },
    },
  ]).catch((err) => {
    throw new ApiError(
      400,
      `DB ERR :: Something went wrong while trying to fetch the created reply :: ${err.message}`
    );
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, createdReply, "Reply has been created successfully!")
    );
});

const getContentReplies = asyncHandler(async (req, res) => {
  const { contentId } = req.params;
  const { contentType } = req.body;

  const ownerLookup = {
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
  };

  const tweetLookupStage = {
    $lookup: {
      from: "tweets",
      localField: "parent",
      foreignField: "_id",
      as: "tweet",

      pipeline: [
        ownerLookup,
        {
          $unwind: "$owner",
        },
      ],
    },
  };

  const commentLookupStage = {
    $lookup: {
      from: "comments",
      localField: "parent",
      foreignField: "_id",
      as: "comment",

      pipeline: [
        ownerLookup,
        {
          $unwind: "$owner",
        },
      ],
    },
  };

  const replyCollectionMap = {
    Tweet: "tweets",
    Comment: "comments",
  };

  let unwindCollection;
  let contentLookup;
  if (replyCollectionMap[contentType] === "tweets") {
    unwindCollection = "$tweet";
    contentLookup = tweetLookupStage;
  } else {
    unwindCollection = "$comment";
    contentLookup = commentLookupStage;
  }

  const replies = await Reply.aggregate([
    {
      $match: {
        parent: new Types.ObjectId(contentId),
        parentType: contentType,
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
    contentLookup,
    {
      $unwind: unwindCollection,
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        replies,
        `${contentType} replies fetched successfully!`
      )
    );
});

export {
  getReply,
  updateReply,
  deleteReply,
  getUserReplies,
  getOtherUserReplies,
  createReply,
  getContentReplies,
};
