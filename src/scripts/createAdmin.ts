import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin";
import { env } from "../config/env";

(async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Mongo connected");

    const email = "admin@emperion.com";
    const plainPassword = "emperion@123";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await Admin.findOneAndUpdate(
      { email },
      {
        email,
        password: hashedPassword,
      },
      { upsert: true }
    );

    console.log("ADMIN CREATED / UPDATED");
    console.log("EMAIL:", email);
    console.log("PASSWORD:", plainPassword);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();