import express from "express";
import {
  deleteVideos,
  editVideos,
  uploadVideos,
  watch,
} from "../controllers/videoController";

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("WATCH VIDEO");
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/upload", uploadVideos);
videoRouter.get("/:id(\\d+)/edit", editVideos);
videoRouter.get("/:id(\\d+)/delete", deleteVideos);

export default videoRouter;
