import express from "express";
import {
  deleteVideo,
  getEdit,
  getUpload,
  postEdit,
  postUpload,
  watch,
} from "../controllers/videoController";
import {
  ownerOnlyMiddleware,
  protectorMiddleware,
  videoUpload,
} from "../middlewares";

const videoRouter = express.Router();
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware, ownerOnlyMiddleware)
  .get(getEdit)
  .post(videoUpload.single("video"), postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware, ownerOnlyMiddleware)
  .get(deleteVideo);

export default videoRouter;
