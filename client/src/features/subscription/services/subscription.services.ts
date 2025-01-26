import { apiConfig } from "@config/api.config";
import axios from "axios";

const subscriptionsEndpoint = `${apiConfig.baseURL}/subscriptions`;
const { config } = apiConfig;

/** 
 * @TODO: response processing before returning 
 * */
const getSubscribedChannels = async (channelId: string) => {
  try {
    const res = await axios.get(
      `${subscriptionsEndpoint}/c/:${channelId}`,
      config
    );
    console.log("get channels subscribed by the current channel: ", res.data);

    if (!res.data?.success) {
      throw new Error(
        res.data?.message ||
          "ERR :: Failed to fetch channels subscribed by the current channel"
      );
    }

    // TODO: response processing before returning
    return res.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch channels subscribed by the current channel: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const toggleSubscription = async (channelId: string) => {
  try {
    const res = await axios.post(
      `${subscriptionsEndpoint}/c/:${channelId}`,
      config
    );
    console.log("toggle subscription: ", res.data);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Unable to toggle subscription: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ERR :: Unable to toggle subscription: ${error.message}`);
    }
  }
};

const getUserChannelSubscribers = async () => {
  try {
    const res = await axios.get(
      `${subscriptionsEndpoint}/u/subscribers`,
      config
    );
    console.log("get channels subscribed by the current channel: ", res.data);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Unable to register new User: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `ERR :: Unable to fetch subscribed channels: ${error.message}`
      );
    }
  }
};

const getUserSubsrciptions = async () => {
  try {
    const res = await axios.get(
      `${subscriptionsEndpoint}/u/channel-subscriptions`,
      config
    );
    console.log("get channels subscribed by the user: ", res.data);

    if (!res.data?.success) {
      throw new Error(
        `ERR :: Unable to fetch channels subscribed by the user: ${res.data.message}`
      );
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `ERR :: Unable to fetch channels subscribed by the user: ${error.message}`
      );
    }
  }
};

export {
  getSubscribedChannels,
  getUserChannelSubscribers,
  getUserSubsrciptions,
  toggleSubscription,
};
