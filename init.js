import app from "./app";

const PORT = 4000;

// response
const handleListening = () => console.log(`listening... on : http://localhost:${PORT}`);

// create server
app.listen(PORT, handleListening);