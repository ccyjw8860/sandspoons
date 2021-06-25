import multer from "multer";

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

export const uploadFiles = multer({ dest: "uploads/" });
