import "dotenv/config";
import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log("✅ Sever is starting at http://localhost:4000 🚀");

app.listen(PORT, handleListening);
