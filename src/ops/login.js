import User from "../models/User";
import fetch from "node-fetch";

export const getCode = (res, config, baseUrl) => {
  const urlParams = new URLSearchParams(config).toString();
  const URL = `${baseUrl}${urlParams}`;
  res.redirect(URL);
};

export const getAccessToken = async (baseUrl, urlConfig, fetchConfig) => {
  const urlParams = new URLSearchParams(urlConfig).toString();
  const URL = `${baseUrl}${urlParams}`;
  const tokenRequest = await (await fetch(URL, fetchConfig)).json();
  return tokenRequest;
};

export const getData = async (tokenRequest, login_type, data_type) => {
  const { access_token } = tokenRequest;
  let data = {};
  if (login_type === "google") {
    if (data_type === "userData") {
      const apiUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
      data = await (
        await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
      ).json();
    }
  } else if (login_type === "github") {
    if (data_type === "userData") {
      const apiUrl = "https://api.github.com/user";
      data = await (
        await fetch(apiUrl, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
    } else if (data_type === "email") {
      const apiUrl = "https://api.github.com/user/emails";
      data = await (
        await fetch(apiUrl, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
    }
  }
  return data;
};

export const login = async (req, res, email, username, login_type) => {
  let user = await User.findOne({ email });
  if (!user) {
    const password = "";
    user = await User.create({
      email,
      username,
      password,
      login_type,
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};
