import passport from "passport";
import User from "./models/User";

// 사용자 인증처리 
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());     // 쿠키에는 오직 user.id만 담아서 보내도록 
passport.deserializeUser(User.deserializeUser()); // id로 사용자를 식별