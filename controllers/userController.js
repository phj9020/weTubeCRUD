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

// //깃헙 로그인으로 인증처리
// export const githubLogin = passport.authenticate("github");

// // 깃헙 갔다 왔을 때 
// export const githubLoginCallBack = (accessToken, refreshToken, profile, cb) => {
//     console.log(accessToken, refreshToken, profile, cb)
// };

// export const postGithubLogIn = (req, res) => {
//     res.send(routes.home);
//   };




export const getLogin = (req, res) => {
    res.render("login", {pageTitle: "Login"});
}
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}


export const userDetail = (req, res) => res.render("userDetail",{pageTitle: "User Detail"});
export const editProfile = (req, res) => res.render("editProfile",{pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword",{pageTitle: "Change Password"});