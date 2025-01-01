import { isValidObjectId, Types } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sanitizeInput } from "../utils/securityUtils.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description, isPrivate = false } = req.body;

  const sanitizedName = sanitizeInput(name).trim().slice(0, 40);
  const sanitizedDescription = sanitizeInput(description).trim().slice(0, 400);

  if (typeof isPrivate !== "boolean") {
    throw new ApiError("isPrivate should be a Boolean Value");
  }

  const playlistObj = {
    name: sanitizedName,
    description: sanitizedDescription,
    owner: req.user._id,
    isPrivate,
  };
  console.log("playlist obj: ", playlistObj);

  const playlist = await Playlist.create(playlistObj).catch((err) => {
    throw new ApiError(500, `Unable to create the playlist :: ${err.message}`);
  });

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully!"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!playlistId || !isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid Playlist Id");
  }

  // Authorization (here -> isPrivate or not)
  const playlistCheck = await Playlist.findById(playlistId);

  if (playlistCheck.isPrivate) {
    throw new ApiError(400, "This Playlist is Private");
  }

  const options = {
    page,
    limit,
  };

  const playlistAggregate = Playlist.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(playlistId),
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
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videoInfo",

        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "videoOwnerInfo",

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
            $unwind: "$videoOwnerInfo",
          },
          {
            $project: {
              _id: 1,
              thumbnail: 1,
              title: 1,
              description: 1,
              duration: 1,
              views: 1,
              isPublished: 1,
              videoOwnerInfo: 1,
            },
          },
        ],
      },
    },
  ]);

  const playlist = await Playlist.aggregatePaginate(
    playlistAggregate,
    options
  ).catch((err) => {
    throw new ApiError(
      500,
      `DB ERR :: Unable to fetch playlist :: ${err.message}`
    );
  });

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fecthed successfully!"));
});

const updatePlaylistById = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const { playlistId } = req.params;

  // Authorization and Validation
  const isAuthorized = await isAuthorizedToEditPlaylist(
    playlistId,
    req.user._id
  );
  if (!isAuthorized) {
    throw new ApiError(400, "User is Unauthorized to edit this playlist");
  }

  const sanitizedName = sanitizeInput(name).trim().slice(0, 40);
  const sanitizedDescription = sanitizeInput(description).trim().slice(0, 400);

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      name: sanitizedName,
      description: sanitizedDescription,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist updated successfully!"));
});

const deletePlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  const isAuthorized = await isAuthorizedToEditPlaylist(
    playlistId,
    req.user._id
  );
  if (!isAuthorized) {
    throw new ApiError(400, "User is Unauthorized to edit this playlist");
  }

  await Playlist.findByIdAndDelete(playlistId).catch((err) => {
    throw new ApiError(
      500,
      `DB ERR :: Unable to delete playlist ${err.message}`
    );
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Playlist deleted successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { videoId, playlistId } = req.params;

  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video playlist Id");
  }

  const isAuthorized = await isAuthorizedToEditPlaylist(
    playlistId,
    req.user._id
  );
  if (!isAuthorized) {
    throw new ApiError(400, "User is unauthorized to edit this playlist");
  }

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $push: {
        videos: new Types.ObjectId(videoId),
      },
    },
    {
      new: true,
    }
  ).catch((err) => {
    throw new ApiError(
      500,
      "DB ERR :: Something went wrong while tyring to add video to the playlist"
    );
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playlist,
        "Video added to the playlist successfully!"
      )
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { videoId, playlistId } = req.params;

  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video playlist Id");
  }

  const isAuthorized = await isAuthorizedToEditPlaylist(
    playlistId,
    req.user._id
  );
  if (!isAuthorized) {
    throw new ApiError(400, "User is unauthorized to edit this playlist");
  }

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      // to remove specific elem from the array
      $pull: {
        videos: videoId,
      },
    },
    {
      new: true,
    }
  ).catch((err) => {
    throw new ApiError(
      500,
      `DB ERR :: Something went wrong while tyring to remove video from the playlist :: ${err.message}`
    );
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playlist,
        "Video removed from the playlist successfully!"
      )
    );
});

/**
 * TODO: populate info of first video of each playlist document
 */
const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User Id");
  }

  const playlistsAggregate = Playlist.aggregate([
    {
      $match: {
        owner: new Types.ObjectId(userId),
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
  ]);

  const playlists = await Playlist.aggregatePaginate(playlistsAggregate, {
    page: page,
    limit: limit,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playlists,
        "All the playlists of the users are fetched successfully!"
      )
    );
});

const isAuthorizedToEditPlaylist = async (playlistId, userId) => {
  // Validation
  if (!playlistId || !isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid Playlist Id");
  }

  // Authorization
  const playlist = await Playlist.findById(playlistId);
  console.log(playlist);
  if (playlist.owner.toString() !== userId.toString()) {
    return false;
  }
  return true;
};

export {
  createPlaylist,
  getPlaylistById,
  updatePlaylistById,
  deletePlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getUserPlaylists,
};
