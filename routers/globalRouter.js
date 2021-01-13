import express from "express";
// import passport from "../passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, getLogin, postLogin, logout  } from "../controllers/userController";
import {onlyPublic} from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin)
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin)

globalRouter.get(routes.login, onlyPublic, getLogin)
globalRouter.post(routes.login, onlyPublic, postLogin)

globalRouter.get(routes.home, home)
globalRouter.get(routes.search, search)
globalRouter.get(routes.logout, onlyPublic, logout)

// globalRouter.get(routes.github, githubLogin);
// globalRouter.get(routes.gitHubCallBack, passport.authenticate('github', { failureRedirect:'/login'}), postGithubLogIn);


export default globalRouter;