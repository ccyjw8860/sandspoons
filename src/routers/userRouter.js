import express from "express";
import { editUser, deleteUser } from "../controllers/userControllers";

const userRouter = express.Router();
userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);

export default userRouter;
