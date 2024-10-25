import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()


const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Errror connecting to MongoDB");
    console.log(error);
  }
};

export default connectDb;
