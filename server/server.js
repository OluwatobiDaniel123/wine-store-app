import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./model/Product.js";
import BestSellers from "./model/BestSekllers.js";
import NewArrivalProduct from "./model/NewArrivalProduct.js";
import SplOfferData from "./model/SplOfferData.js";
import { connectDB } from "./config/connection.js";
import { authRouter } from "./routes/authRoutes.js";

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ greetings: "Hello from wine store" });
});

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use(route);

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
