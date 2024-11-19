// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import route from "./routes/route.js";
// import Product from "./model/Product.js";
// import img1 from "../server/images/img-1.jpg";

// const app = express();

// dotenv.config();

// // use middleware
// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static("uploads"));

// // using routes
// app.use(route);

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () =>
//       console.log(`Server and MongoDB Started On Port: ${PORT}`)
//     );

//     // Insert a new document
//     const Products = new Product({
//       img: img1,
//       productName: "Your Product Name",
//       price: 99.99,
//       color: "Your Color",
//       badge: false,
//       des: "Your Description",
//     });

//     Products.save()
//       .then(() => console.log("Product inserted successfully"))
//       .catch((error) => console.log("Error inserting product:", error));
//   })
//   .catch((error) => console.log(`Server not connecting: ${error}`));

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

// Middleware setup
app.use(cors());
app.use(express.json());

// Serve the uploads directory for static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use routes
app.use(route);

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

    // const product = new SplOfferData({
    //   img: "http://localhost:5000/uploads/img-1.jpg", // Ensure this path points to an existing image in the 'uploads' folder
    //   productName: "Your Product Name",
    //   price: 99.99,
    //   color: "Your Color",
    //   badge: false,
    //   des: "Your Description",
    //   cat: "Bac",
    // });

    product
      .save()
      .then(() => console.log("Product inserted successfully"))
      .catch((error) => console.log("Error inserting product:", error));
  })

  .catch((error) => console.log(`Server not connecting: ${error}`));
