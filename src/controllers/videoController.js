export const homeVideos = (req, res) => res.render("home"); //src/views/home.js를 rendering
export const editVideos = (req, res) => res.send("Edit Videos");
export const search = (req, res) => res.send("Search Videos");
export const watch = (req, res) => res.render("watch");
export const deleteVideos = (req, res) => res.send("delete Videos");
export const uploadVideos = (req, res) => res.send("upload Videos");
