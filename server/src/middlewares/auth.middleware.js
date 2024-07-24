// it will check if its user or not

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// for middleware -> REMEBER -> to use "next"
export const verifyJWT = asyncHandler(async (req, _, next) => {
  // using "_" in place of "res", we are not sending any response from this middleware
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    // we can generate the token but decode can only by the one which has the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // after verification we get decoded token

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

// Middlewares are mainly used with router
