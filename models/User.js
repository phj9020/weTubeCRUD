import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avartarUrl: String,
    facebookId : Number,
    githubId: Number, 
    kakaoId: Number
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'})

const model = mongoose.model("User", userSchema);

export default model; 