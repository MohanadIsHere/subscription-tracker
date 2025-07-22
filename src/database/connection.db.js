import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Database connected successfully in ${NODE_ENV} mode ✅`);
  } catch (error) {
    console.log("Database connection failed", error);
  }
};
export default connectToDatabase;