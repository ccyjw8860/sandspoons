import Video from "../models/Video";

export const home = (req, res) => {
  Video.find({}, (error, videos) => {
    console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
  });
};

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching ${video.title}` });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing ${video.title}` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  //video upload화면을 rendering함
  return res.render("upload", { pageTitle: "UploadVideo" });
};

export const postUpload = (req, res) => {
  const video = req.body;

  return res.redirect("/");
};
