import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

connectDB();

const PORT = env.PORT || process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Emperion backend running on port ${PORT}`);
});