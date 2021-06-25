import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //express에게 Pug를 쓸거라고 선언함.
app.set("views", process.cwd() + "/src/views"); //express에게 src/views 폴더를 찾으라고 선언함.
app.use(logger);
app.use(express.urlencoded({ extended: true })); //express application이 form의 value를 JS형식으로 변형함.
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, //resave false, saveUnitialized false => session을 수정할때만 cookie를 넘겨줌
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(localsMiddleware);

//passport setting
app.use(passport.initialize());
app.use(passport.session());

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
