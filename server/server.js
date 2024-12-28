import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import route from "./routes/route.js";
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
//   img: `https://picsum.photos/200/300?random=${index + 1}`,
//   productName: `Wine Bottle ${index + 1}`,
//   price: Number((Math.random() * 10000 + 2000).toFixed(2)),
//   color: ["Red", "White", "Rose", "Sparkling"][index % 4],
//   badge: index % 2 === 0,
//   des: `A premium selection of ${
//     ["red", "white", "rose", "sparkling"][index % 4]
//   } wine. Perfect for celebrations and fine dining.`,
//   cat: ["Cabernet Sauvignon", "Chardonnay", "Merlot", "Pinot Noir"][index % 4],
// }));

// Product.insertMany(products)
//   .then(() => console.log("Wine products inserted successfully!"))
//   .catch((error) => console.error("Error inserting wine products:", error));
