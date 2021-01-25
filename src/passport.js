import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import { githubLoginCallBack, facebookLoginCallBack, kakaoLoginCallBack } from './controllers/userController'
import routes from './routes';

// 사용자 인증처리
passport.use(User.createStrategy());

// 사용자 정보 담아서 callbackURL로 도착 
passport.use(
    new GithubStrategy({
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `https://damp-ocean-58580.herokuapp.com/${routes.gitHubCallBack}`
    },
    githubLoginCallBack
  )
);

passport.use(
  new FacebookStrategy({
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://damp-ocean-58580.herokuapp.com/${routes.faceBookCallBack}`,
      profileFields:['id', 'displayName', 'photos', 'email'],
      scope: ['public_profile', 'email']
  },
  facebookLoginCallBack
  )
);

passport.use(
  new KakaoStrategy({
      clientID: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: `https://damp-ocean-58580.herokuapp.com/${routes.kakaoCallback}`
  },
  kakaoLoginCallBack
  )
);


passport.serializeUser(User.serializeUser());     // 쿠키에는 오직 user.id만 담아서 보내도록 
passport.deserializeUser(User.deserializeUser()); // id로 사용자를 식별