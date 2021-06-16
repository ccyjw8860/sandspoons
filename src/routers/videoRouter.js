import express from "express";

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("WATCH VIDEO");
videoRouter.get("/watch", handleWatchVideo);

export default videoRouter;
