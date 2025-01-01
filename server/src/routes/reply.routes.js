import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createReply,
  deleteReply,
  getContentReplies,
  getOtherUserReplies,
  getReply,
  getUserReplies,
  updateReply,
} from "../controllers/reply.controller.js";

const router = Router();
router.use(verifyJWT);

// Reply routes
router
  .route("/:replyId")
  .get(getReply)
  .patch(updateReply)
  .delete(deleteReply);

// User Reply Routes
router.route("/users/me").get(getUserReplies); // replies by authenticated user
router.route("/users/:userId").get(getOtherUserReplies); // replies by another user

// Content Routes
router
  .route("/content/:contentId/replies")
  .post(createReply)
  .get(getContentReplies);

export default router;
