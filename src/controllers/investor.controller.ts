import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Investor from "../models/investor";

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * REGISTER INVESTOR (PENDING)
 */
export const registerInvestor = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Investor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Investor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Investor.create({
      name,
      email,
      password: hashedPassword,
      status: "pending",
      role: "investor",
      investedAmount: 0,
      returns: 0,
    });

    res.status(201).json({
      message: "Registration successful. Await admin approval.",
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * LOGIN INVESTOR (APPROVED ONLY)
 */
export const loginInvestor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const investor = await Investor.findOne({ email });
    if (!investor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (investor.status !== "approved") {
      return res.status(403).json({ message: "Investor not approved yet" });
    }

    const isMatch = await bcrypt.compare(password, investor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: investor._id, role: "investor" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

/**
 * INVESTOR DASHBOARD
 */
export const getInvestorDashboard = async (req: any, res: Response) => {
  try {
    const investor = await Investor.findById(req.investorId).select(
      "-password"
    );

    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }

    res.json({
      name: investor.name,
      investedAmount: investor.investedAmount,
      returns: investor.returns,
      balance: investor.investedAmount + investor.returns,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard" });
  }
};