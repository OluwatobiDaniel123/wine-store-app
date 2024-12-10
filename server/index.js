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

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(route);

// const products = Array.from({ length: 6 }, (_, index) => ({
//   img: `https://wine-store-app-server.vercel.app//uploads/img-1.jpg`, // Dynamic image paths
//   productName: ` Product Data ${index + 1}`,
//   price: (Math.random() * 100).toFixed(2), // Random price between 0 and 100
//   color: "Your Color",
//   badge: index % 2 === 0, // Alternate badge value between true and false
//   des: `Description for Product ${index + 1}`,
//   cat: "Ruban",
// }));

// // Save all products at once using insertMany
// BestSellers.insertMany(products)
//   .then(() => console.log("100 products inserted successfully"))
//   .catch((error) => console.error("Error inserting products:", error));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server and MongoDB Started On Port: ${PORT}`)
    );
  })

  .catch((error) => console.log(`Server not connecting: ${error}`));
