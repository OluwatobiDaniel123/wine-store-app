import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SplOfferDataSchema = new Schema(
  {
    img: { type: String },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    badge: { type: String, required: true },
    des: { type: String, required: true },
    cat: { type: String, required: true },
  },
  { timestamps: true }
);

const SplOfferData = mongoose.model("SplOfferData", SplOfferDataSchema);

export default SplOfferData;

//  _id: "201",
//     img: imprimante1,
//     productName: "Printer",
//     price: "35.00",
//     color: "Blank and White",
//     badge: true,
//     des: "Lorelatest fashion trends, cutting-edge tech gadgets, or everyday essentials, we've got you covered.m ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
//     cat: "imprimante",
