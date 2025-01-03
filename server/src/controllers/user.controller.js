import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// as we're going to generate ascess & refresh token again many time
// lets wrap it in a function
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    // store the refresh token in DB
    await user.save({ validateBeforeSave: false }); // as we've already validated the user & pwd
    // so just save the refresh Token in DB

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "shikanji aur code",
  // });

  /* Steps to register a user */
  // get user detials from the frontend
  // validation - not empty & in valid format
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, check avatar uploaded or not
  // create user object - create entry in DB
  // rmv pwd & refresh token field from response
  // check for user creation
  // return res

  const { username, email, fullName, password } = req.body;

  // testing
  // console.log("email: ", email);

  // validation - one by one
  // if(fullName === ""){
  //   throw new ApiError(400, "Full Name is required")
  // }

  // validation
  if (
    [fullName, email, username, password].some((filed) => filed?.trim() === "")
    // study .map() vs .some()
  ) {
    // field is empty
    throw new ApiError(400, "All field are required");
  }

  // console.log("req: ", req)
  // console.log("req.body: ", req.body)
  // console.log("req.files: ", req.files)

  const existedUser = await User.findOne({
    // $or: [{}, {}]
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // req.body -> has sara ka sara data

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  // const coverImageLocalPath = req.files?.coverImage[0]?.path; // returns undefined if coverImage has not been sent

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    // if no coverImage
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
    // excluding fileds given in the string with '-' sign
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring the user");
  }

  // return res.status(201).json({createdUser})
  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User registered successfully !!!")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  // username/email
  // pwd
  // > click on login
  // check username/email in our DB
  // match pwd of the user
  // > if user exists && pwd matched:
  //   generate AccessToken
  //   generate refreshToken
  //   > store these tokens in cookies and send it to user

  const { username, email, password } = req.body;

  // if both username and email are absent
  if (!(username || email)) {
    throw new ApiError(400, "username or email required");
  }

  // // simple method
  // User.findOne({email})
  // User.findOne({username})

  // Adv Method
  const user = await User.findOne({
    // to find a document form the DB
    // $or -> MongoDB operator
    $or: [{ username }, { email }],

    // find from either username or email
  });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  // User -> to access in DB
  // user -> to access user data stored in our server
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(403, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // here we've to decide whether we need to contact DB again
  // or store necessary values in anothe variable
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // options for COOKIES
  const options = {
    // now cookie is only modifiable by the SERVER
    htmlOnly: true,
    secure: true,

    // frontend can only read it (write operation not available to them)
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
          // in case user want to save access and refresh tkn
          // e.g. developing mobile app where cookie cannot be saved
        },
        "User logged In successfully !!"
      )
    );

  //  NOTE :: we can also access cookie from req
});

const logoutUser = asyncHandler(async (req, res) => {
  // clear cookies
  // rmv refresh token form the DB

  // User.findById(_id) // but id where???

  // here comes -> middleware to the rescue

  // now using verifyJWT (and next() inside it)
  // we now have user data along with req
  const user = await User.findByIdAndUpdate(
    // 1st arg -> give id of the document to be found
    req.user._id,

    // 2nd arg -> what to update
    {
      // $unset if you want to completely remove the refreshToken field from the document.
      // $set with null if you want to keep the field but reset its value.
      $unset: {
        refreshToken: 1,
      },
      // $set: {
      //   refreshToken: null,
      // },

      // MongoDB does not store fields with an undefined value, 
      // thus it ignores undefined values.
      // Using $set with undefined will not work.
      // $set: {
      //   refreshToken: undefined,
      // },
    },

    // options
    {
      // now response will have updated value
      new: true,
    }
  ).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, user, "User Logged Out Successfully!!"));
});

// controller for endpoint for the refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.redreshToken || req.body.refreshToken;

  // if refresh token not found
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorised token");

    // throwing error is better than sending fake 200 repsonse
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired ot used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    // generate new refresh token
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookir("accesstoken", accessToke, options)
      .cookir("refreshtoken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refreshed successfully !!"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confPassword } = req.body;

  if (!(newPassword === confPassword)) {
    throw new ApiError(404, "Error::Password does not match");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;

  try {
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    throw new ApiError(500, "Something went wrong. Unable to set new password");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password has been set successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // we will the user id from middleware
  // middleware will get it using jwt and access Token

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName && !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,

    {
      $set: {
        // ES6 method (same name of vars)
        fullName,

        // before ES6 method
        email: email,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully!!"));
});

// files update
// NOTE: make sure to use middlewares: multer to accept file in route
// and another for to update user should be logged in

const updateUserAvatar = asyncHandler(async (req, res) => {
  // file path stored in local

  // upload cloudinary
  // we will get the pub URL of the img
  // store it in the user
  // update DB

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Image updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover Image file is missing");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading cover image");
  }

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover Image updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params; // params -> URL e.g. x.com/AdityNath007

  if (!username?.trim()) {
    throw new ApiError(400, "username is missing");
  }

  // normal way
  // User.find({username})
  // here 1st we will find the user details using username
  // then perform aggragate op.

  // But we can directly do it using "$match"
  // using aggregation pipelines

  // it returns an array
  const channel = await User.aggregate([
    // 1st pipeline: $match
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        // remember?
        // Subscriptions -> subscriptions (in MongoDB) (automatic conversion)
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          // to calc count
          $size: "$subscribers",
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
        },
        // user subscribed to the channel or not
        // user is the one who is sending req to access the channel
        isSubscribed: {
          $condition: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            // if true -> then merge? -> true
            then: true,

            // any else condition? -> false
            else: false,
          },
        },
      },
    },
    {
      $project: {
        // set flag to 1 to return
        fullName: 1,
        username: 1,
        email: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        avatar: 1,
        coverImage: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "channel does not exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User channel fetched successfully")
    );
});

const getWatchHistory = asyncHandler(async(req, res) => {
  // req.user._id // here we get string
  // mongoose will automatically converts it into mongoDB ObjectId in the required format


  // remember aggregations pipelines returns []
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",

              // new pipeline to get only required fields
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                    subscribersCount: 1
                  }
                }
              ]
            }
          },
          {
            $addFields: {
              owner: {
                $first: "$owner"
              }
            }
          }
        ]
      }
    }
  ])


  return res
  .status(200)
  .json(
    new ApiResponse(200, user[0].watchHistory, "Watch history fetched successfully")
  )
})

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory
};
