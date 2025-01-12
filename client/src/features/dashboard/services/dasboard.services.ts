import { apiConfig } from "@config/api.config";
import axios from "axios";

const dashboardEndpoint = `${apiConfig.baseURL}/dashboard`;
const { config } = apiConfig;

const getChannelStats = async (channelId: string) => {
  try {
    const res = await axios.get(
      `${dashboardEndpoint}/:${channelId}/stats`,
      config
    );

    console.log("get channel stats res: ", res);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Failed to fetch channel stats:: ${res.data?.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch channel stats: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const getChannelVideos = async (channelId: string) => {
  try {
    const res = await axios.get(
      `${dashboardEndpoint}/:${channelId}/videos`,
      config
    );

    console.log("get channel videos res: ", res);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Failed to fetch channel videos :: ${res.data?.message}`
      );
    }

    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch channel videos: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export { getChannelStats, getChannelVideos };
