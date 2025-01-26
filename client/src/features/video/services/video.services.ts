import { apiConfig } from "@config/api.config";
import axios from "axios";
import { Video } from "../types/video.types";

const videoEndpoint = `${apiConfig.baseURL}/videos`;
const { config } = apiConfig;

const getAllVideos = async () => {
  try {
    const res = await axios.get(`${videoEndpoint}/all-videos`, config);

    if (!res.data.success) {
      throw new Error(`ERR :: Unable to fetch all videos ${res.data.message}`);
    }

    console.log(res);

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while fetching all videos :: ${error.message}`);
    }
  }
};

const publishAVideo = async (videoInfo: Video) => {
  if (!videoInfo) {
    throw new Error("Video info must be not be empty");
  }

  try {
    const res = await axios.post(`${videoEndpoint}/publish`, videoInfo, config);

    console.log("publish res data: ", res.data);

    if (!res.data.success) {
      throw new Error(
        `ERR :: Unable to upload the video :: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error)
      console.error(`ERR while publishing video :: ${error.message}`);
  }
};

const getVideoById = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Video id must be present");
  }

  try {
    const res = await axios.get(`${videoEndpoint}/${videoId}`, config);

    console.log("get video by id res: ", res.data);

    if (!res.data.success) {
      console.error(`ERR while fetching video by id :: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error)
      console.error(`ERR while publishing video :: ${error.message}`);
  }
};

const updateVideo = async (videoUpdateInfo: {
  videoId: string;
  title: string;
  description: string;
  videoFile: File | null;
  thumbnail: File | null;
}) => {
  if (!videoUpdateInfo) {
    throw new Error("Video update info must not be empty");
  }

  try {
    config.headers = { "Content-Type": "multipart/form-data" };

    const formData = new FormData();

    formData.append("title", videoUpdateInfo.title);
    formData.append("description", videoUpdateInfo.description);

    if (videoUpdateInfo.videoFile)
      formData.append("videoFile", videoUpdateInfo.videoFile);

    if (videoUpdateInfo.thumbnail)
      formData.append("videoFile", videoUpdateInfo.thumbnail);

    const res = await axios.patch(
      `${videoEndpoint}/${videoUpdateInfo.videoId}`,
      formData,
      config
    );

    console.log(`update video res: `, res.data);

    if (!res.data.success) {
      console.error(`Unable to update video :: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error)
      console.error(`ERR :: while updating video :: ${error.message}`);
  }
};

const deleteVideo = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Video Id must be present");
  }
  try {
    const res = await axios.delete(`${videoEndpoint}/${videoId}`, config);

    console.log(`delete video res: `, res.data);

    if (!res.data.success) {
      console.error(`Unable to delete video :: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error)
      console.error(`ERR :: while deleting video :: ${error.message}`);
  }
};

const togglePublishStatus = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Video Id must be present");
  }

  try {
    const res = await axios.patch(`${videoEndpoint}/${videoId}`, config);

    console.log(`toggle publish video res: `, res.data);

    if (!res.data.success) {
      console.error(`Unable to toggle publish video :: ${res.data.message}`);
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error)
      console.error(`ERR :: while toggling publish video :: ${error.message}`);
  }
};

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
