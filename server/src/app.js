import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

// normal approach (mostly for tutorials)
// app.use(cors())

// in PRODUCTION
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// earlier, body-parser were used as middleware to handle accept json
// but now express has it by default
app.use(express.json({ limit: "16kb" }));

// to encode-decode the url -> extended -> to allow extra props
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// to allow cookies which only server can access
// to perfom some CRUD Ops
app.use(cookieParser());
app.use(errorHandler);

// after all the middlewares
// we will use routes

// segregation of files by importing here
// routes import
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import commentRouter from "./routes/comment.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
// routes declaration
// app.get() -> routes and controller hard coded

app.use("/api/v1/users", userRouter); // middleware to get router

app.use("/api/v1/video", videoRouter); // middleware for video router

app.use("/api/v1/subscriptions", subscriptionRouter); // middleware for subscription routes

app.use("/api/v1/comments", commentRouter); // middleware for comment routes

app.use("/api/v1/tweets", tweetRouter); // middleware for tweeet routes
// http://localhost:portNum/api/v1/users/register

export { app };
