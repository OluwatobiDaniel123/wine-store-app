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
import upload from "../middleware/upload.js";

const routes = express.Router();

routes.route("/auth/register").post(register);
routes.route("/auth/login").post(login);

routes
  .route("/api/NewArrivalProduct")
  .post(upload.single("img"), create_NewArrivalProduct)
  .get(get_NewArrivalProduct);

routes
  .route("/api/bestsellers")
  .post(upload.single("img"), create_BestSellers)
  .get(get_BestSellers);

routes
  .route("/api/product")
  .post(upload.single("img"), create_Product)
  .get(get_Product);

routes
  .route("/api/specialofferdata")
  .post(upload.single("img"), create_SplOfferData)
  .get(get_SplOfferData);

routes.route("/api/transaction").delete(delete_Transaction);

export default routes;
