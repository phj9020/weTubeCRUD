import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallBack } from './controllers/userController'
import routes from './routes';

// 사용자 인증처리
passport.use(User.createStrategy());

// 사용자 정보 담아서 callbackURL로 도착 
passport.use(
    new GithubStrategy({
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.gitHubCallBack}`
    },
    githubLoginCallBack
  )
);

passport.serializeUser(User.serializeUser());     // 쿠키에는 오직 user.id만 담아서 보내도록 
passport.deserializeUser(User.deserializeUser()); // id로 사용자를 식별