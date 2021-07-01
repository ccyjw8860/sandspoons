import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userControllers";
import { home, search, testController } from "../controllers/videoController";
import {
  avatarUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const rootRouter = express.Router();
rootRouter.route("/").get(home).post(logout);
rootRouter
  .route("/join")
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(avatarUpload.single("avatar"), postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/logout", protectorMiddleware, logout);
rootRouter.get("/search", search);
rootRouter.get("/test", testController);

export default rootRouter;
