import express from "express";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, (req,res) => res.send("I am Home from router"))
globalRouter.get(routes.join, (req,res) => res.send("I am join from router"))
globalRouter.get(routes.login, (req,res) => res.send("I am login from router"))
globalRouter.get(routes.logout, (req,res) => res.send("I am logout from router"))
globalRouter.get(routes.search, (req,res) => res.send("I am search from router"))

export default globalRouter;