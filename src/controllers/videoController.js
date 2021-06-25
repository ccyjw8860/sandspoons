import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: "desc" });
    return res.render("root/home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.send("ERROR");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    res.render("videos/watch", { pageTitle: video.title, video });
  } else {
    res.status(404).render("root/404", { pageTitle: "Video not found" });
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video === null) {
    res.status(404).render("root/404", { pageTitle: "Video not found" });
  } else {
    res.render("videos/edit", { pageTitle: `Editing ${video.title}`, video });
  }
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
    file,
  } = req;
  console.log(title, description, hashtags);
  const video = await Video.findById({ _id: id });
  const oldVideoUrl = video.videoUrl;
  if (!video) {
    res.status(404).render("root/404", { pageTitle: "Video not found" });
  }
  const newVideo = await Video.findByIdAndUpdate(
    id,
    {
      videoUrl: file ? file.path : oldVideoUrl,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    },
    { new: true }
  );
  res.render("watch", { pageTitle: newVideo.title });
};

export const getUpload = (req, res) => {
  //video upload화면을 rendering함
  return res.render("videos/upload", { pageTitle: "UploadVideo" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    file: { path },
  } = req;
  try {
    await Video.create({
      videoUrl: path,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("videos/upload", {
      pageTitle: "UploadVideo",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  res.render("videos/search", { pageTitle: "Seach Videos", videos });
};
