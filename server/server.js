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

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

app.get("/", (req, res) => {
  res.json({ greetings: "Hello from wine store" });
});

app.use(route);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  "/images",
  express.static(path.join(__dirname, "images"), {
    setHeaders: (res) => {
      res.contentType("image/jpeg"); // Ensure proper content type
    },
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
