// 최신 js버전으로 바꿔서 바벨 작동 여부 확인
// const express = require('express');
import express from "express";
import morgan from "morgan";
import helmet from"helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleWare } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// middleware
app.use(helmet());
app.set('view engine', 'pug');
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
// initialize 전에 session을 넣는다
app.use(session({
    secret: process.env.COOKIE_SECRET, 
    resave: true, 
    saveUninitialized: false,
    store: new CookieStore({mongooseConnection: mongoose.connection})
})
);
// cookieParser로부터 쿠키가 내려와서 쿠키가 passport가 initialize되고
// passport가 스스로 쿠키를 들여다봐서 그 쿠키 정보에 해당하는 사용자를 찾아준다 
app.use(passport.initialize()); 
// passport는 자기가 찾은 그 사용자를 요청(request)의 object 즉 req.user로 만들어준다
app.use(passport.session());    



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

