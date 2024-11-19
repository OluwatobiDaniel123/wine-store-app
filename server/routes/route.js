import express from "express";
import { login, register } from "../controller/userAuth.js";
import {
  delete_Transaction,
  create_NewArrivalProduct,
  get_NewArrivalProduct,
  get_BestSellers,
  create_BestSellers,
  get_Product,
  create_Product,
  create_SplOfferData,
  get_SplOfferData,
} from "../controller/controller.js";
import upload from "../middleware/upload.js"; // Import upload middleware

const routes = express.Router();

// Authentication routes
routes.route("/auth/register").post(register);
routes.route("/auth/login").post(login);

// New Arrival Product routes
routes
  .route("/api/NewArrivalProduct")
  .post(upload.single("img"), create_NewArrivalProduct) // Image upload for New Arrival Product creation
  .get(get_NewArrivalProduct); // Get all New Arrival Products

// Best Sellers routes
routes
  .route("/api/bestsellers")
  .post(upload.single("img"), create_BestSellers) // Image upload for Best Sellers creation
  .get(get_BestSellers); // Get all Best Sellers

// Product routes
routes
  .route("/api/product")
  .post(upload.single("img"), create_Product) // Image upload for Product creation
  .get(get_Product); // Get all Products

routes
  .route("/api/specialofferdata")
  .post(upload.single("img"), create_SplOfferData) // Image upload for Product creation
  .get(get_SplOfferData); // Get all Products

// Transaction routes
routes.route("/api/transaction").delete(delete_Transaction); // Delete a transaction

export default routes;
