import User from "../models/User";
import bycrypt from "bcrypt";
import { getCode, getAccessToken, getData, login } from "../ops/login";

export const getJoin = (req, res) => {
  res.render("users/join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { username, email, password, password_2 },
    file,
  } = req;
  const { checkEmail, checkUsername } = await User.checkUser(email, username);

  if (checkEmail && checkUsername) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "This email and username is already taken.",
    });
  } else if (checkUsername) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "This username is already taken.",
    });
  } else if (checkEmail) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "This email is already taken.",
    });
  }
  if (password === password_2) {
    if (!checkEmail && !checkUsername) {
      try {
        console.log(file);

        await User.create({
          avatarUrl: file ? file.path : "",
          username,
          email,
          password: await User.hashing(password),
          login_type: "sandSpoons",
        });
        res.redirect("/login");
      } catch (error) {
        console.log(error);
        console.log(password);
        res.status(400).render("users/join", {
          pageTitle: "Join",
          errorMessage: error._message,
        });
      }
    } else {
      res.status(400).render("users/join", {
        username,
        email,
        errorMessage: "Password confirmation does not match.",
      });
    }
  }
};
export const getUserEdit = (req, res) => {
  const {
    user: { login_type },
  } = req.session;
  let showChangePassword = true;
  if (login_type !== "sandSpoons") {
    showChangePassword = false;
  }
  res.render("users/edit-profile", {
    pageTitle: "Edit Profile",
    showChangePassword,
  });
};
export const postUserEdit = async (req, res) => {
  const {
    session: {
      user: { _id, email: sessionEmail, username: sessionUsername, avatarUrl },
    },
    body: { email, username },
    file,
  } = req;
  let searchParam = [];
  if (sessionEmail !== email) {
    searchParam.push({ email });
  }
  if (sessionUsername !== username) {
    searchParam.push({ username });
  }
  if (searchParam.length > 0) {
    const foundUser = await User.findOne({ $or: searchParam });
    if (foundUser && foundUser._id.toString() !== _id) {
      return res.status(404).render("users/edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage: "This username/email is already taken.",
      });
    }
  }
  const UpdatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      username,
      email,
    },
    { new: true }
  );
  req.session.user = UpdatedUser;
  res.redirect("edit");
};
export const deleteUser = (req, res) => res.send("Remove User");
export const getLogin = async (req, res) => {
  res.render("users/login", {
    pageTitle: "Login",
    git_id: process.env.GIT_ID,
  });
};
export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ email, login_type: "sandSpoons" });
  if (user) {
    const pwCheck = await bycrypt.compare(password, user.password);
    if (pwCheck) {
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    } else {
      res.status(400).render("users/login", {
        pageTitle,
        errorMessage: "Password does not correct",
      });
    }
  } else {
    res.status(400).render("users/login", {
      pageTitle: "Login",
      errorMessage: "An account with this email does not exist.",
    });
  }
};
export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
export const see = (req, res) => res.send("See Profile");

export const startGithubLogin = (req, res) => {
  const config = {
    client_id: process.env.GIT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const baseUrl = "https://github.com/login/oauth/authorize?";
  getCode(res, config, baseUrl);
};

export const getGithubCallback = async (req, res) => {
  const urlConfig = {
    client_id: process.env.GIT_ID,
    client_secret: process.env.GIT_SECRET,
    code: req.query.code,
  };
  const fetchConfig = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  };
  const baseUrl = "https://github.com/login/oauth/access_token?";
  const tokenRequest = await getAccessToken(baseUrl, urlConfig, fetchConfig);
  const userData = await getData(tokenRequest, "github", "userData");
  const emailData = await getData(tokenRequest, "github", "email");
  const emailObject = emailData.find(
    (email) => email.primary === true && email.verified === true
  );
  if (!emailObject) {
    res.redirect("/login");
  }
  const { email } = emailObject;
  const username = userData.login;
  await login(req, res, email, username, "github");
};

export const startGoogleLogin = (req, res) => {
  const config = {
    client_id: process.env.GOOGLE_ID,
    redirect_uri: "http://localhost:4000/users/google/callback",
    response_type: "code",
    scope: "profile email",
  };
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth?";
  getCode(res, config, baseUrl);
};

export const getGoogleCallback = async (req, res) => {
  const baseUrl = "https://oauth2.googleapis.com/token?";
  const code = req.query.code;
  const urlConfig = {
    code,
    client_id: process.env.GOOGLE_ID,
    client_secret: process.env.GOOGLE_SECRET,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:4000/users/google/callback",
  };
  const fetchConfig = {
    method: "POST",
  };

  const tokenRequest = await getAccessToken(baseUrl, urlConfig, fetchConfig);
  const userData = await getData(tokenRequest, "google", "userData");
  const { email } = userData;
  const username = email.split("@")[0];
  login(req, res, email, username, "google");
};

export const getChangePassword = (req, res) => {
  res.render("users/change_password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { old_password: old, new_password: newPw, new_password_2: newPw2 },
    session: {
      user: { _id: id, password },
    },
  } = req;

  const checkPw = await bycrypt.compare(old, password);
  let errorMessage = "";

  if (checkPw) {
    if (old !== newPw) {
      if (newPw === newPw2) {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          {
            password: await User.hashing(newPw),
          },
          { new: true }
        );
        req.session.user.password = updatedUser.password;
        req.session.destroy();
        res.redirect("/login");
      } else {
        errorMessage =
          "입력하신 새로운 비밀번호가 서로 다릅니다. 다시 입력해주세요";
        res.status(400).render("users/change_password", {
          pageTitle: "Change Password",
          errorMessage,
        });
      }
    } else {
      errorMessage =
        "기존 비밀번호와 새로운 비밀번호가 같습니다. 다른 비밀번호로 지정해주세요.";
      res.status(400).render("users/change_password", {
        pageTitle: "Change Password",
        errorMessage,
      });
    }
  } else {
    errorMessage = "기존 비밀번호가 틀립니다. 다시 입력해주세요.";
    res.status(400).render("users/change_password", {
      pageTitle: "Change Password",
      errorMessage,
    });
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");

  if (!user) {
    res.status(404).render("404", { pageTitle: "User not found." });
  }
  res.render("users/profile", {
    pageTitle: user.name,
    user,
    videos: user.videos,
  });
};
