// 최신 js버전으로 바꿔서 바벨 작동 여부 확인
// const express = require('express');
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleWare } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

// middleware
app.use(helmet({contentSecurityPolicy: false}));
app.set('view engine', 'pug');
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));


//Video not Showing- header allows
// app.use(function(req, res, next){
//     res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
//     return next();
// });

app.use(localsMiddleWare);
// /user경로에 접속하면 router.js의 userRouter 사용하겠다
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

