import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle: "Join"});
}

export const postJoin = async(req, res, next) => {
    const {
        body : { name, email, password, password2}
    } = req
    
    if(password !== password2) {
        res.status(400)
        res.render("join", {pageTitle: "Join"})
    } else {
        // register User
        try{
            const user = await User({name, email});
            await User.register(user, password);
            next();
        } catch(error) {
            console.log(error);
        }
    }
}


export const getLogin = (req, res) => {
    res.render("login", {pageTitle: "Login"});
}
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});



// //깃헙 로그인으로 인증처리
export const githubLogin = passport.authenticate("github");

// 깃헙 갔다 성공적으로 처리하고 왔을 때 
export const githubLoginCallBack = async(accessToken, refreshToken, profile, cb) => {
    // 유저 생성 
    console.log(accessToken, refreshToken, profile, cb)
    const { 
        _json: { id, avatar_url, name, email }
    } = profile;

    try {
        const user = await User.findOne({email});
        // console.log(user);
        //동일한 email을 가진 사용자를 발견하면 그 사용자의 정보를 업데이트한다
        if(user) {
            user.githubId = id;
            user.save();
            return cb(null, user)  // 이걸 쿠키에 저장 cb(error, userYes)
        } 

        //사용자를 찾지 못했다면, 계정을 하나 만든다 
        const newUser = await User.create({
            email,
            name, 
            githubId : id,
            avartarUrl : avatar_url
        });
        return cb(null, newUser);
        
        
    } catch (error) {
        return cb(error);
    }
};

// 로그인 후 사용자를 home으로 보낸다 
export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
  };


export const logout = (req, res) => {
    console.log(req.logout());
    req.logout();
    res.redirect(routes.home);
}


export const userDetail = (req, res) => res.render("userDetail",{pageTitle: "User Detail"});
export const editProfile = (req, res) => res.render("editProfile",{pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword",{pageTitle: "Change Password"});