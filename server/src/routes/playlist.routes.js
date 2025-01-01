import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylistById,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylistById,
} from "../controllers/playlist.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createPlaylist);

router
  .route("/:playlistId")
  .get(getPlaylistById)
  .patch(updatePlaylistById)
  .delete(deletePlaylistById);

router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

router.route("/user/:userId").get(getUserPlaylists);

export default router;
