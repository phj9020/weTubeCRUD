import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle: "Join"});
}

export const postJoin = async(req, res) => {
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
        } catch(error) {
            console.log(error);
        }
        // Log user in 
        res.redirect(routes.home);
    }
}


export const getLogin = (req, res) => {
    res.render("login", {pageTitle: "Login"});
}
export const postLogin = (req, res) => {
    // to Do : check if password is match to the one from the DB
    // sucess redirect to home 
    // failure render(routes.login)
    res.redirect(routes.home);
   
}

export const logout = (req, res) => {
    // To do : Process log out
    res.redirect(routes.home);
}


export const userDetail = (req, res) => res.render("userDetail",{pageTitle: "User Detail"});
export const editProfile = (req, res) => res.render("editProfile",{pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword",{pageTitle: "Change Password"});