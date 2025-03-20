import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SplOfferDataSchema = new Schema(
  {
    productName: { type: String, required: true },
    des: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    badge: { type: Boolean, required: true },
    image: { type: String, required: true },
    // cat: { type: String, required: true },
  },
  { timestamps: true }
);

const SplOfferData = mongoose.model("SplOfferData", SplOfferDataSchema);

export default SplOfferData;
