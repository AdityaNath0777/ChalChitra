import { apiConfig } from "@config/api.config";
import axios from "axios";
import { Playlist } from "../types/playlist.types";

const playlistsEndpoint = `${apiConfig.baseURL}/playlists`;
const { config } = apiConfig;

const createPlaylist = async (playlistData: Playlist) => {
  try {
    const res = await axios.post(`${playlistsEndpoint}`, playlistData, config);

    console.log("create playlist res: ", res);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Failed to fetch channels subscribed by the current channel :: ${res.data?.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch channels subscribed by the current channel: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const getPlaylistById = async (playlistId: string) => {
  try {
    const res = await axios.get(`${playlistsEndpoint}/:${playlistId}`, config);

    console.log("get playlist by id res: ", res);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Failed to fetch playlist by id :: ${res.data?.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch playlist by id: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const updatePlaylistById = async (
  playlistId: string,
  name: string,
  description: string
) => {
  try {
    const res = await axios.patch(
      `${playlistsEndpoint}/:${playlistId}`,
      { name, description },
      config
    );

    console.log("delete playlist by id res: ", res);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Failed to delete playlist by id :: ${res.data?.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to delete playlist by id: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const deletePlaylistById = async (playlistId: string) => {
  try {
    const res = await axios.delete(
      `${playlistsEndpoint}/:${playlistId}`,
      config
    );

    console.log("delete playlist by id res: ", res);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Failed to delete playlist by id :: ${res.data?.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to delete playlist by id: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const addVideoToPlaylist = async (videoId: string, playlistId: string) => {
  try {
    const res = await axios.patch(
      `${playlistsEndpoint}/add/:${videoId}/:${playlistId}`,
      config
    );

    console.log("add video to playlist res: ", res);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Failed to add video to playlist :: ${res.data?.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to add video to playlist: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const removeVideoFromPlaylist = async (videoId: string, playlistId: string) => {
  try {
    const res = await axios.patch(
      `${playlistsEndpoint}/remove/:${videoId}/:${playlistId}`,
      config
    );

    console.log("remove video from playlist res: ", res);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Failed to remove video from playlist :: ${res.data?.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to remove video from playlist: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const getUserPlaylists = async (userId: string) => {
  try {
    const res = await axios.get(`${playlistsEndpoint}/user/:${userId}`, config);

    console.log("fetch user playlists res: ", res);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Failed to fetch user playlists :: ${res.data?.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch user playlists: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylistById,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylistById,
};
