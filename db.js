import mongoose from "mongoose";
// import dotenv from "dotenv";

mongoose.connect("mongodb://localhost:27017/we-tube", 
{
    useNewUrlParser: true,
    useFindAndModify: false
}
);

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = (error)=> console.log(`Error on DB connection:${error}`)

db.once("open", handleOpen);
db.on("error", handleError);