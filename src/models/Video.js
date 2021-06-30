import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
  videoUrl: { type: String, required: true },
  //User와 연결
  //_id가 Object이기 때문에 type:mongoose.Schema.Types.ObjectId로 설정
  //ref는 어떤 모델을 참고하고 있는지 설정하는것. User.js에서 export default User;라고 선언했으므로 ref에는 User가 들어감
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", (hashtags) => {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;
