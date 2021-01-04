import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, required: 'Text is requried'},
    createdAt : { type: Date, default: Date.now}
});

const model = mongoose.model("Comment", commentSchema);

export default model; 
