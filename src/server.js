import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //express에게 Pug를 쓸거라고 선언함.
app.set("views", process.cwd() + "/src/views"); //express에게 src/views 폴더를 찾으라고 선언함.
app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log("✅ Sever is starting at http://localhost:4000 🚀");

app.listen(PORT, handleListening);
