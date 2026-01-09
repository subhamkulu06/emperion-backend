import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import { env } from "../config/env";

export const loginAdmin = async (req: any, res: any) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  console.log("ADMIN FROM DB:",admin);

  if (!admin) return res.status(401).json({ message: "Invalid credentials" });
  
  const ismatch = await bcrypt.compare(password, admin.password);
  
  if (!ismatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, env.JWT_SECRET, { expiresIn: "1d" });
  res.status(200).json({token});
};