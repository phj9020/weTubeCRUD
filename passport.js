import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallBack, facebookLoginCallBack } from './controllers/userController'
import routes from './routes';

// 사용자 인증처리
passport.use(User.createStrategy());

// 사용자 정보 담아서 callbackURL로 도착 
passport.use(
    new GithubStrategy({
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.gitHubCallBack}`,
      profileFields:['id', 'displayName', 'photos', 'email'],
      scope: ['public_profile', 'email']
    },
    githubLoginCallBack
  )
);

passport.use(
  new FacebookStrategy({
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.faceBookCallBack}`
  },
  facebookLoginCallBack
  )
);

passport.serializeUser(User.serializeUser());     // 쿠키에는 오직 user.id만 담아서 보내도록 
passport.deserializeUser(User.deserializeUser()); // id로 사용자를 식별