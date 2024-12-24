import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { sanitizeInput } from "../utils/securityUtils.js";

/**
 * publish a video
 *
 * get All Videos
 *
 * get a video by ID
 *
 * update video
 *
 * delete video
 *
 * togglePublishStatus
 */

const publishAVideo = asyncHandler(async (req, res) => {
  // TODO: video
  /**
   * just like -> image temp store server
   *           -> upload cloudinary
   *
   * video temp -> store server
   * upload clodinary
   * return a public URL -> string
   * same for thumbnail -> URL
   * dur -> cloudinary URL
   * title, desc, isPublish, views -> obj{} store
   * owner -> user ObjectId -> isValidObjectId
   * save in mongoDB
   * returns -> id, string
   */

  // extracting data from req
  const { title, description } = req.body;
  const owner = req.user._id;

  // Data Validation
  if (!title || !description) {
    throw new ApiError(400, "Title and Description is mandatory");
  }

  // validate owner (valid user id or not)
  if (!mongoose.isValidObjectId(owner)) {
    throw new ApiError(400, "Invalid User ID");
  }

  // check for video & thumbnail
  const videoLocalPath = req.files?.videoFile[0].path;
  const thumbnailLocalPath = req.files?.thumbnail[0].path;

  if (!videoLocalPath) {
    throw new ApiError(400, "Video file is reqiored");
  }

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail file is required");
  }

  try {
    // upload both video & thumbnail parallely
    // with Promise.all -> it will only resolve if all arrays are resolved,
    //                 -> even a single rejection of any promise will return rejection
    // const [uploadedVideo, uploadedThumbnail] = await Promise.all([
    //   cloudinary.uploader.upload(videoLocalPath, { resource_type: "auto" }),
    //   cloudinary.uploader.upload(thumbnailLocalPath, { resource_type: "auto" }),
    // ]);

    // const videoFileURL = uploadedVideo.secure_url;
    // const thumbnailURL = uploadedThumbnail.secure_url;
    // const duration = uploadedVideo.duration;

    const uploadedVideo = await uploadOnCloudinary(videoLocalPath);
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    // const videoFileURL = uploadedVideo.url;        // for http
    const videoFileURL = uploadedVideo.secure_url; // for https
    const thumbnailURL = uploadedThumbnail.secure_url;
    const duration = uploadedVideo.duration;

    const views = 0;
    const isPublished = false;

    // create a video object
    const video = await Video.create({
      videoFile: videoFileURL,
      thumbnail: thumbnailURL,
      title,
      description,
      duration,
      views,
      isPublished,
      owner,
    });

    // as by default video will always be unpublished
    // so we will remove data which are not required
    const createdVideo = await Video.findById(video._id).select(
      "-videoFile -view -duration"
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, createdVideo, "Video Uploaded successfully!!!")
      );
  } catch (error) {
    throw new ApiError(
      500,
      `Video Upload :: Error :: video & thumbnail upload failed :: ${error.message}`
    );
  } finally {
    // Clean up temporary files from server
    /**
     * When using fs.unlinkSync(),
     * if the file doesn’t exist or cannot be deleted for any reason,
     * it will throw an error,
     * potentially causing the server to crash.
     *
     * Instead, use fs.unlink() (asynchronous)
     * with a callback to handle errors gracefully.
     */
    // fs.unlinkSync(videoLocalPath);
    // fs.unlinkSync(thumbnailLocalPath);
    /************************************************* */
    /* cloudinary utility already doing it so no need */
    /************************************************* */
    // fs.unlink(videoLocalPath, (err) => {
    //   if (err)
    //     console.error(`Failed to delete temp video file: ${err.message}`);
    // });
    // fs.unlink(thumbnailLocalPath, (err) => {
    //   if (err)
    //     console.error(`Failed to delete temp thumbnail file: ${err.message}`);
    // });
  }
});

const getAllVideos = asyncHandler(async (req, res) => {
  /**
   * get info, based on that info prep, search and get video
   * info: -> page no., limit, query, sortBy, sortType, userId from req.body
   *
   * search and get video urls
   *
   * process:
   * owner?
   * video owner match
   * return
   */

  const { page, limit, sortBy, sortType, userId } = req.query;

  const options = {
    page: page,
    limit: limit,
    sort: {},
  };

  const isUserValid = await User.findById(userId);

  if (!isUserValid) {
    throw new ApiError(400, "Invalid UserId :: This User does not exists");
  }

  console.log("User exists");

  const sortOrder = sortType === "asc" ? 1 : -1;
  options.sort[sortBy] = sortOrder; // e.g. sort: { createedAt: -1 }
  console.log(options);

  const allUserVideosAggregate = Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerInfo", // it will be stored as array

        // to fetch only required fields
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
      // to convert the owenerInfo[] into separate objects
      // by creating a new document for each object inside the array
      $unwind: "$ownerInfo",
    },
    {
      $sort: options.sort, // e.g. { createdAT: -1} will be assigned to $sort
    },
  ]);

  Video.aggregatePaginate(allUserVideosAggregate, options)
    .then((result) => {
      console.log("result: ", result);
      return res.status(200).json(new ApiResponse(200, result, "User Exists"));
    })
    .catch((error) => console.log(error.message));
});

const getVideoById = asyncHandler(async (req, res) => {
  /**
   * we have videoId,
   * search the document having that videoId from the Video Model
   * return URL of that video
   */
  // console.log(req);
  const { videoId } = req.params;

  const isVideoIdValid = mongoose.Types.ObjectId.isValid(videoId);

  if (!isVideoIdValid) {
    throw new ApiError(404, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);

  /**
   * remember: aggregate accepts & returns an array
   *
   * accept: [] of pipelines
   * returns: [] of docs
   * */
  // const video = await Video.aggregate([
  //   {
  //     $match: {
  //       _id: new mongoose.Types.ObjectId(videoId),
  //     },
  //   },
  //   {
  //     $project: {
  //       owner: 1,
  //       thumbnail: 1,
  //       duration: 1,
  //       title: 1,
  //       views: 1,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "owner",
  //       foreignField: "_id",
  //       as: "owner",

  //       // fetch only required fields
  //       pipeline: [
  //         {
  //           $project: {
  //             fullName: 1,
  //             username: 1,
  //             avatar: 1,
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     $unwind: "$owner",
  //   },
  // ]);

  // if (!video?.length) {
  //   throw new ApiError(404, "Video does not exists");
  // }

  if (!video) {
    throw new ApiError(404, "Video does not exists");
  }
  console.log("video object: ", video);

  const ownerInfo = await User.findById(video.owner).select(
    "-password -refreshToken"
  );

  if (!ownerInfo) {
    throw new ApiError(404, "Owner of the video does not exists");
  }

  let videoInfo = { ...video._doc, owner: ownerInfo._doc };

  // console.log(videoInfo);

  /**
   *  response for findBy method
   * */
  return res
    .status(200)
    .json(
      new ApiResponse(200, videoInfo, "Video has been fetched successfully!")
    );

  /**
   * response for Aggregate method
   * */
  // return res.status(200).json(new ApiResponse(200, video[0], "Video has been fetched successfully!"));
});

/**
 * Fetches a video by ID and checks if the given userId matches the video's owner.
 *
 * @param {string} videoId - The ID of the video to fetch.
 * @param {string} userId - The ID of the user to authorize.
 *
 * @returns {boolean} - True if the user is authorized to modify the video, false otherwise.
 * @throws {ApiError} - Throws an error if there's an issue fetching the video.
 */
const fetchAndAuthorizeVideo = async (videoId, userId) => {
  const video = await Video.findById(videoId).catch((err) => {
    throw new ApiError(500, `ERR :: Unable to fetch video: ${err.message}`);
  });

  if (!video || !userId || video.owner.toString() !== userId.toString()) {
    return false;
  }

  return true;
};

/**
 * Updates an existing video with new information.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 *
 * @returns {Promise<void>} - A Promise that resolves when the video is updated.
 * @throws {ApiError} - Throws an error if there's an issue updating the video.
 *
 * **Extracts the following from the request:**
 * - `videoId` from `req.params`
 * - `title` and `desc` from `req.body`
 * - `user` ID from `req.user._id`
 */
const updateVideo = asyncHandler(async (req, res) => {
  /**
   * get info: videoId (compulsory), video, desc, title, etc where changes are required
   * mongoDB pipeline to make changes
   * return status and new URL of the video
   *
   */
  /**
   * videoId is from route path params,
   * so we will definetly have videoId
   */
  const videoId = req.params.videoId;

  /**
   * User validation has already be done by verifyJWT middleware
   */
  const user = req.user._id;

  /**
   * Validate VideoId
   */
  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(404, "ERR :: Invalid Video Id");
  }

  /**
   * Authorization: checking whether the user is video owner or not
   */
  /**
   * My first Approach
   */
  // const fetchedVideo = await Video.findById(videoId).catch((err) => {
  //   throw new ApiError(
  //     500,
  //     `ERR :: Unable to fetch Video details :: ${err.message}`
  //   );
  // });
  // console.log(fetchedVideo, "\n", user);

  // if (fetchedVideo?.owner.toString() !== user?.toString()) {
  //   throw new ApiError(
  //     404,
  //     "ERR :: Access denied: You do not have permission to edit this video."
  //   );
  // }

  // no need of await here, as we are not returning any promise
  // we are returning simple true or false
  const isAuthorized = fetchAndAuthorizeVideo(videoId, user);

  if (!isAuthorized) {
    throw new ApiError(
      400,
      "ERR :: Access Denied: User is unauthorized to modify this video"
    );
  }

  /**
   * Extraction & Sanitization of title and description
   */
  const { title, desc } = req.body;
  const sanitizedTitle = sanitizeInput(title).trim().slice(0, 70);
  const sanitizedDesc = sanitizeInput(desc).trim().slice(0, 400);

  const videoLocalPath = req.files?.videoFile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  /**
   * Config Object to store fields and their new values for the update.
   */
  let updateVideoConfig = {};

  if (videoLocalPath) {
    const uploadedVideo = await uploadOnCloudinary(videoLocalPath);

    if (!uploadedVideo) {
      throw new ApiError(500, "ERR :: Unable to upload video");
    }

    updateVideoConfig.videoFile = uploadedVideo.secure_url;
    updateVideoConfig.duration = uploadedVideo.duration;
  }

  if (thumbnailLocalPath) {
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!uploadedThumbnail) {
      throw new ApiError(500, `ERR :: Unable to upload thumbnail`);
    }
    updateVideoConfig.thumbnail = uploadedThumbnail.secure_url;
  }

  if (sanitizedTitle) updateVideoConfig.title = sanitizedTitle;
  if (sanitizedDesc) updateVideoConfig.description = sanitizedDesc;

  // console.log(updateVideoConfig);

  /**
   * NOTE: findByIdAndUpdate() by default returns Old document
   *
   * thus to get UPDATED Document: use options -> {new: true}
   */
  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    updateVideoConfig,
    { new: true }
  ).catch((err) => {
    throw new ApiError(
      500,
      `ERR :: Unable to update video details :: ${err.message}`
    );
  });

  // console.log("updated video: ", updatedVideo);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully!!"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  /**
   * get info -> videoId
   *
   * search and use MongoDB to delete that data
   *
   * return status
   */

  const { videoId } = req.params;
  const userId = req.user._id;

  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(404, "ERR :: Invalid video Id");
  }

  const isAuthorized = fetchAndAuthorizeVideo(videoId, userId);

  if (!isAuthorized) {
    throw new ApiError(
      404,
      "ERR :: Access Denied: User is unauthorized to modify this video"
    );
  }

  /**
   * Delete record from the Database
   */
  const delVideoDB = await Video.findByIdAndDelete(videoId);

  if (!delVideoDB) {
    throw new ApiError(404, "ERR :: Video does not exists");
  }

  /**
   * Delete the video and thumbnail from cloud storage (cloudinary)
   */
  const delVideoCloud = await deleteFromCloudinary(
    delVideoDB.videoFile,
    "video"
  );
  const delThumbnailCloud = await deleteFromCloudinary(
    delVideoDB.thumbnail,
    "image"
  );

  if (delVideoCloud.result !== "ok") {
    console.error(
      `ERR :: Unable to delete Video form cloud : video link : ${delVideoDB.videoFile}`
    );
  }
  if (delThumbnailCloud.result !== "ok") {
    console.error(
      `ERR :: Unable to delete Thumbnail form cloud : thumbnail link : ${delVideoDB.thumbnail}`
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, delVideoDB, "Video deleted successfully!"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  /**
   * get videoId
   *
   * search the document having that videoId
   * extract isPublish form the document
   * toggle it
   * save it to MongoDB
   * and return status
   */

  const { videoId } = req.params;
  const userId = req.user._id;

  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(404, "ERR :: Invalid video Id");
  }

  const isAuthorized = fetchAndAuthorizeVideo(videoId, userId);

  if (!isAuthorized) {
    throw new ApiError(
      404,
      "ERR :: Access Denied: User is unauthorized to modify this video"
    );
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "ERR :: Video does not exists");
  }

  video.isPublished = !video.isPublished;

  await video.save().catch((err) => {
    throw new ApiError(500, `ERR :: Unable to toggle Publish Status :: ${err.message}`);
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        video,
        "Video's publish status has been toggled successfully"
      )
    );
});

export {
  publishAVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
