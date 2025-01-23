import mongoose from "mongoose";

export const conncetDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB conncected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connnection error:", error);
  }
};
