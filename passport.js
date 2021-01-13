import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import githubLoginCallBack from './controllers/userController'

// 사용자 인증처리
passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback"
}),
    // 사용자가 깃헙갔다가 돌아왔을 때 실행 
    githubLoginCallBack
);

passport.serializeUser(User.serializeUser());     // 쿠키에는 오직 user.id만 담아서 보내도록 
passport.deserializeUser(User.deserializeUser()); // id로 사용자를 식별