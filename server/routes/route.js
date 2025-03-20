import express from "express";
import { login, register } from "../controller/userAuth.js";
import {
  create_NewArrivalProduct,
  get_NewArrivalProduct,
  get_BestSellers,
  create_BestSellers,
  get_Product,
  create_Product,
  create_SplOfferData,
  get_SplOfferData,
  delete_Single_Product,
  get_all_users,
  getOrders,
  CreateOrders,
} from "../controller/controller.js";
import upload from "../middleware/upload.js";

const routes = express.Router();

routes.route("/auth/register").post(register);
routes.route("/auth/login").post(login);

routes
  .route("/api/newarrivalproduct")
  .post(upload.array("images", 9999), create_NewArrivalProduct)
  .get(get_NewArrivalProduct);

routes
  .route("/api/bestsellers")
  .post(upload.array("images", 9999), create_BestSellers)
  .get(get_BestSellers);

routes
  .route("/api/products")
  .post(upload.array("images", 9999), create_Product)
  .get(get_Product);

routes
  .route("/api/specialofferdata")
  .post(upload.array("images", 9999), create_SplOfferData)
  .get(get_SplOfferData);

routes.route("/api/deleteProduct").delete(delete_Single_Product);

routes.route("/api/users").get(get_all_users);

routes.route("/api/orders/create").get(CreateOrders);

routes.route("/api/orders/:userId").get(getOrders);

export default routes;
