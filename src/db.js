import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
    process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,, 
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
);

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = (error)=> console.log(`Error on DB connection:${error}`)

db.once("open", handleOpen);
db.on("error", handleError);