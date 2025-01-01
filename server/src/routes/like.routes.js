import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getLikedContent,
  getLikedContentByType,
  getLikedTweets,
  getLikedVideos,
  getUserLikedContentByType,
  getUserLikes,
  toggleCommentLike,
  toggleLike,
  toggleReplyLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../controllers/like.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/toggle/content/:contentId").post(toggleLike);
router.route("/users/me").get(getUserLikes);
router.route("/users/:userId").get(getLikedContent);
router.route("/users/me/:contentType").get(getUserLikedContentByType);
router.route("/users/:userId/:contentType").get(getLikedContentByType);

router.route("/toggle/video/:videoId").post(toggleVideoLike);
router.route("/toggle/tweet/:tweetId").post(toggleTweetLike);
router.route("/toggle/comment/:commentId").post(toggleCommentLike);
router.route("/toggle/reply/:replyId").post(toggleReplyLike);

router.route("/videos").get(getLikedVideos);
router.route("/tweets").get(getLikedTweets);

export default router;
