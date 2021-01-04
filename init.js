import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";


const PORT = process.env.PORT || 4000;

// response
const handleListening = () => console.log(`listening... on : http://localhost:${PORT}`);

// create server
app.listen(PORT, handleListening);

