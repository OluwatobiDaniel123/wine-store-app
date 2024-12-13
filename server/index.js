import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import route from "./routes/route.js";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./model/Product.js";
import BestSellers from "./model/BestSekllers.js";
import NewArrivalProduct from "./model/NewArrivalProduct.js";
import SplOfferData from "./model/SplOfferData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(route, cors());

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server and MongoDB Started On Port: ${PORT}`)
    );
  })

  .catch((error) => console.log(`Server not connecting: ${error}`));

// const products = Array.from({ length: 6 }, (_, index) => ({
//   img: `https://picsum.photos/200?random=${index + 1}`, // Dynamic image fetching from Lorem Picsum
//   productName: `Product Data ${index + 1}`,
//   price: (Math.random() * 100).toFixed(2),
//   color: "Your Color",
//   badge: index % 2 === 0,
//   des: `Description for Product ${index + 1}`,
//   cat: "Ruban",
// }));

// NewArrivalProduct.insertMany(products)
//   .then(() => console.log("Products inserted successfully!"))
//   .catch((error) => console.error("Error inserting products:", error));
