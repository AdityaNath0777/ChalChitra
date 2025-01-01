import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import os from "os";
const getHealth = asyncHandler(async (req, res) => {
  // const { _ } = req.body; // for next.js -> to make the route dynamic
  // remember? last time in next.js, this caused the bus which took hours and days to fix (' ')
  await User.aggregate([{ $project: { username: 1 } }]).limit(1);

  // external dependency
  const testURL = "http://res.cloudinary.com";
  const cloudFetch = await fetch(testURL);

  // no json in this response -> so will throw an error
  // const data = await cloudFetch.json();

  if (!cloudFetch.ok) {
    throw new ApiError("CloudinaryError");
  }

  const freeMemory = os.freemem();
  const threshold = 200000000;
  if (freeMemory < threshold) {
    throw new ApiError(500, "Insufficient Memory Available");
  }

  return res.status(200).json(new ApiResponse(200, "Service is healthy"));
});

export { getHealth };
