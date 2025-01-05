import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  des: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  badge: { type: Boolean, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
