import express from "express";
import { join } from "../controllers/userControllers";
import { homeVideos } from "../controllers/videoController";

const globalRouter = express.Router();
globalRouter.get("/", homeVideos);
globalRouter.get("/join", join);

export default globalRouter;
