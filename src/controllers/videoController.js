import User from "../models/User";
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
  //video를 찾고 ower의 id를 찾아서 또 User에서 id로 해당 user를 찾는것보다 아래의 코드가 훨씬 간단함
  //popluate를 함으로써 owner가 object 형태의 user로 채워짐
  //원래는 owner에 string으로 id만 있었는데, populate로 하면서 owner가 object로 표현됨
  const video = await Video.findById(id).populate("owner");

  if (video) {
    res.render("videos/watch", {
      pageTitle: video.title,
      video,
      owner: video.owner,
    });
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
    session: {
      user: { _id: id },
    },
    body: { title, description, hashtags },
    file: { path },
  } = req;

  try {
    const newVideo = await Video.create({
      videoUrl: path,
      title,
      description,
      owner: id, //Video.js에서 ower의 type을 ObjectId로 했기 떄문에 그냥 string으로 넣어도 됨
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(id);
    user.videos.push(newVideo._id);
    user.save();
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

export const postComments = async (req, res) => {
  const {
    body: { context },
    params: { id },
  } = req;
  const video = await Video.findByIdAndUpdate(
    id,
    {
      comments: comments.push({
        commentor: id,
        context,
      }),
    },
    { new: true }
  ).populate("owner");

  res.render("videos/watch", {
    pageTitle: video.title,
    video,
    owner: video.owner,
  });
};
