import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

connectDB();

const PORT = process.env.PORT || env.PORT || 5000;

app.listen(env.PORT, () => {
  console.log(`🚀 Emperion backend running on port ${PORT}`);
});