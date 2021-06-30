import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  login_type: { type: String },
  avatarUrl: { type: String },
  //User는 많은 video 목록을 갖을 수 있으므로, Array로 선언함
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.static("hashing", async (pw) => await bcrypt.hash(pw, 5));
userSchema.static("checkUser", async function (email, username) {
  const checkEmail = await this.exists({ email });
  const checkUsername = await this.exists({ username });

  return { checkEmail, checkUsername };
});

const User = mongoose.model("User", userSchema);
export default User;
