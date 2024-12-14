import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected successfully on ${mongoDB.connection.host}`);
  } catch (err) {
    console.log(err.message);
  }
};
