import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  console.log("MONGO URI =", uri ? "FOUND" : "MISSING");

  if (!uri) {
    console.error("❌ MONGODB_URI is missing");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};