import { Request, Response } from "express";
import Investor from "../models/investor";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const investorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const investor = await Investor.findOne({ email });
    if (!investor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (investor.status !== "active") {
      return res.status(403).json({ message: "Investor access disabled" });
    }

    const match = await bcrypt.compare(password, investor.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { investorId: investor._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      investor: {
        name: investor.name,
        email: investor.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};