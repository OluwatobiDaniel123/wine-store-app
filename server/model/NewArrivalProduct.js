import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NewArrivalProductSchema = new Schema(
  {
    img: { type: String },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    badge: { type: String, required: true },
    des: { type: String, required: true },
    badge: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const NewArrivalProduct = mongoose.model(
  "NewArrivalProduct",
  NewArrivalProductSchema
);

export default NewArrivalProduct;
