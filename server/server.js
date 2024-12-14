import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import route from "./routes/route.js";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./model/Product.js";
import BestSellers from "./model/BestSekllers.js";
import NewArrivalProduct from "./model/NewArrivalProduct.js";
import SplOfferData from "./model/SplOfferData.js";
import { connectDB } from "./config/connection.js";

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(cors());
app.use(
  cors({
    origin: "*",
    // credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ greetings: "Hello from wine store" });
});

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

route.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  res.json({ message: "Login successful" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
