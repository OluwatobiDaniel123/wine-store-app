import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import Product from "./model/Product.js";
import BestSellers from "./model/BestSekllers.js";
import NewArrivalProduct from "./model/NewArrivalProduct.js";
import SplOfferData from "./model/SplOfferData.js";
import { connectDB } from "./config/connection.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ greetings: "Hello from wine store" });
});

app.use(route);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

// const products = Array.from({ length: 26 }, (_, index) => ({
//   img: `https://placekitten.com/200/300${index + 1}`,
//   productName: `Product Data ${index + 1}`,
//   price: (Math.random() * 100).toFixed(2),
//   color: "Your Color",
//   badge: index % 2 === 0,
//   des: `Description for Product ${index + 1}`,
//   cat: "Ruban",
// }));
// Product.insertMany(products)
//   .then(() => console.log("Products inserted successfully!"))
//   .catch((error) => console.error("Error inserting products:", error));
