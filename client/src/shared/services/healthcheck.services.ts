import { apiConfig } from "@config/api.config";
import axios from "axios";

const healthCheckEndpoint = `${apiConfig.baseURL}/healthcheck`;
const { config } = apiConfig;

const completeHealthCheck = async () => "healthcheck is noice!";

const getHealthCheck = async () => {
  try {
    const res = await axios.get(`${healthCheckEndpoint}`, config);
    console.log("get healthcheck res: ", res.data);

    if (!res.data?.success) {
      throw new Error(`ERR :: Health not good :: ${res.data?.message}`);
    }
  } catch (error) {
    throw new Error(
      `Health not good: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export { completeHealthCheck, getHealthCheck };
