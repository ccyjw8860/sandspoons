import express from "express";
import {
  getUserEdit,
  postUserEdit,
  deleteUser,
  startGithubLogin,
  getGithubCallback,
  startGoogleLogin,
  getGoogleCallback,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers";
import {
  avatarUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
  socialExeptMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getUserEdit)
  .post(avatarUpload.single("avatar"), postUserEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware, socialExeptMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/delete", protectorMiddleware, deleteUser);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, getGithubCallback);
userRouter.get("/google/start", publicOnlyMiddleware, startGoogleLogin);
userRouter.get("/google/callback", publicOnlyMiddleware, getGoogleCallback);

export default userRouter;
