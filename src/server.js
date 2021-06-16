import express from "express";

const PORT = 4000;
const app = express();

const handleHome = (req, res) => {
  return res.send("WELCOME!");
};

const handleLogin = (req, res) => {
  return res.send("Login here.");
};

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log("hi?");

app.listen(PORT, handleListening);
