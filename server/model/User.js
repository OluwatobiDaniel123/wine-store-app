import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      max: 15,
      require: true,
    },
    email: {
      type: String,
      min: 5,
      max: 15,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      max: 15,
      require: true,
    },
    phone: {
      type: String,
      max: 15,
      require: true,
    },
    picturePath: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      max: 15,
      require: true,
    },
    city: {
      type: String,
      max: 15,
      require: true,
    },
    country: {
      type: String,
      max: 15,
      require: true,
    },
    zip: {
      type: String,
      max: 15,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
