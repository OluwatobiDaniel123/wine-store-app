import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        title: String,
        price: Number,
        quantity: Number,
        total: Number,
      },
    ],
    totalAmount: Number,
    status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
