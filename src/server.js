import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //express에게 Pug를 쓸거라고 선언함.
app.set("views", process.cwd() + "/src/views"); //express에게 src/views 폴더를 찾으라고 선언함.
app.use(logger);
app.use(express.urlencoded({ extended: true })); //express application이 form의 value를 JS형식으로 변형함.
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
