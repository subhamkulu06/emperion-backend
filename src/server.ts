import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const PORT = process.env.PORT || env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Emperion backend running on port ${PORT}`);
});