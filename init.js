import "./db";
import dotenv from "dotenv";
import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();


const PORT = process.env.PORT || 4000;

// response
const handleListening = () => console.log(`listening... on : http://localhost:${PORT}`);

// create server
app.listen(PORT, handleListening);

