import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, getLogin, postLogin, logout, githubLogin, postGithubLogIn, getMe, facebookLogin, postFacebookLogin, kakaoLogin, postKakaoLogin  } from "../controllers/userController";
import {onlyPublic, onlyPrivate} from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin)
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin)

globalRouter.get(routes.login, onlyPublic, getLogin)
globalRouter.post(routes.login, onlyPublic, postLogin)

globalRouter.get(routes.home, home)
globalRouter.get(routes.search, search)
globalRouter.get(routes.logout, onlyPrivate, logout)

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(routes.gitHubCallBack, passport.authenticate('github', 
{ failureRedirect:'/login'}), postGithubLogIn);

globalRouter.get(routes.faceBook, facebookLogin);
globalRouter.get(routes.faceBookCallBack, passport.authenticate('facebook',
{ failureRedirect:'/login'}), postFacebookLogin)

globalRouter.get(routes.kakao, kakaoLogin);

globalRouter.get(routes.kakaoCallback, passport.authenticate('kakao',
{ failureRedirect:'#!/login'}), postKakaoLogin)


globalRouter.get(routes.me, getMe)

export default globalRouter;