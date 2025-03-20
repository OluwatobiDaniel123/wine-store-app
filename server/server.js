import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/connection.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ greetings: "Hello from wine store" });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(route);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
