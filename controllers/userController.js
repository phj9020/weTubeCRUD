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



// 깃헙 웹사이트로 보냄 
export const githubLogin = passport.authenticate("github");

// 깃헙 갔다 성공적으로 처리하고 왔을 때 
export const githubLoginCallBack = async(accessToken, refreshToken, profile, cb) => {
    // 유저 생성 
    console.log(accessToken, refreshToken, profile, cb)
    const { 
        _json: { id, avatar_url: avartarUrl, name, email }
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
            avartarUrl
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


// 페이스북 웹사이트로 보냄 
export const facebookLogin = passport.authenticate('facebook');

// 페이스북 콜백 
export const facebookLoginCallBack = (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb)
}

//페이스북 사용자인증 완료시 
export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home)
}

// 카카오 웹사이트로 보냄
export const kakaoLogin = passport.authenticate('kakao');

export const kakaoLoginCallBack = async(accessToken, refreshToken, profile, done) =>{
    console.log(accessToken, refreshToken, profile, done)
    const { 
        _json: { id }
    } = profile;
    const email = profile._json.kakao_account.email;
    const name = profile.displayName;
    try{
        const user = await User.findOne({email});
        if(user) {
            user.kakaoId = id;
            user.save();
            return done(null, user);
        } 
        const newUser = await User.create({
            email,
            name, 
            kakaoId : id
        });
        return done(null, newUser);
    } catch(error){
        return done(error);
    }
}

export const postKakaoLogin = (req, res) => {
    res.redirect(routes.home)
}



export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}

// getMe에서는 user를 req.user로 전달할것 (지금 로그인한 사용자)
export const getMe = (req, res) => {
    res.render("userDetail",{pageTitle: "User Detail", user: req.user});
}

// userDetail에서는 사용자를 찾는 과정이 필요하다 
// 실제 로그인 사용지 id를 찾아서 override해야 된다 
export const userDetail = async(req, res) =>{
    // get parameter 
    const { params : { id } } = req;
    try {
        const user = await User.findById(id);
        res.render("userDetail",{pageTitle: "User Detail", user});
    } catch(error){
        console.log(error)
        res.redirect(routes.home);
    }
};
export const editProfile = (req, res) => res.render("editProfile",{pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword",{pageTitle: "Change Password"});