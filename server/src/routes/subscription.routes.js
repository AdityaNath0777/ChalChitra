import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  getUserSubsrciptions,
  toggleSubscription,
} from "../controllers/subscription.controller.js";

const router = Router();

/**
 * Apply verifyJWT middleware to all routes in this file
 */
router.use(verifyJWT);

router
  .route("/c/:channelId")
  .get(getSubscribedChannels)
  .post(toggleSubscription);

router.route("/u/subscribers").get(getUserChannelSubscribers);
router.route("/u/channel-subscriptions").get(getUserSubsrciptions);
export default router;
