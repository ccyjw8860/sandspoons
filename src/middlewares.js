import multer from "multer";
import Video from "./models/Video";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "SandSpoons";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    res.redirect("/");
  }
};

export const socialExeptMiddleware = (req, res, next) => {
  if (req.session.user.login_type !== "sandSpoons") {
    res.redirect("/");
  } else {
    next();
  }
};

export const ownerOnlyMiddleware = async (req, res, next) => {
  let userId = "";
  if (req.session) {
    userId = req.session.user._id;
  }

  const {
    params: { id: videoId },
  } = req;
  const video = await Video.findById(videoId);
  if (String(video.owner._id) === String(userId)) {
    next();
  } else {
    res.status(404).redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 5242880,
  },
});
export const videoUpload = multer({ dest: "uploads/videos" });
