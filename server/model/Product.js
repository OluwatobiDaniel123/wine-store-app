import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    img: { type: String },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    des: { type: String, required: true },
    badge: { type: Boolean, default: false, required: true },

    // pdf: { type: String, require: true },
    // ficheTech: { type: String, require: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
