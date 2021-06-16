import express from "express";

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("EDIT USER");
userRouter.get("/edit", handleEditUser);

export default userRouter;
