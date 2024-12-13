import mongoose from "mongoose";

// const conn = mongoose
//   .connect(process.env.MONGODB_URL)
//   .then((db) => {
//     console.log("Database Connected");
//     return db;
//   })
//   .catch((err) => {
//     console.log("Connection Error", err);
//   });

// export default conn;

export const connectDB = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected successfully on ${mongoDB.connection.host}`);
  } catch (err) {
    console.log(err.message);
  }
};
