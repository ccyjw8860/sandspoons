import express from "express";
import { join, login } from "../controllers/userControllers";
import { homeVideos, search } from "../controllers/videoController";

const globalRouter = express.Router();
globalRouter.get("/", homeVideos);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
