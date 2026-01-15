import Investor from "../models/investor";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

/* ===========================
   CREATE INVESTOR (ADMIN)
=========================== */
export const createInvestor = async (req: Request, res: Response) => {
  try {
    const password = Math.random().toString(36).slice(-8);
    const hashed = await bcrypt.hash(password, 10);

    const investor = await Investor.create({
      ...req.body,
      password: hashed,
    });

    // EMAIL SEND LATER
    console.log("Investor password:", password);

    res.json({ success: true, investor });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Investor creation failed" });
  }
};

/* ===========================
   UPDATE INVESTOR (ADMIN)
=========================== */
export const updateInvestor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const investor = await Investor.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }

    res.json(investor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ===========================
   LIST INVESTORS (ADMIN)
=========================== */
export const listInvestors = async (req: Request, res: Response) => {
  try {
    const investors = await Investor.find().select(
      "name email investedAmount currentBalance status"
    );

    res.json(investors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch failed" });
  }
};