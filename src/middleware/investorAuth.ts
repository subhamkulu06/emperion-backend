import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface InvestorRequest extends Request {
  investorId?: string;
}

export const investorAuth = (
  req: InvestorRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { investorId: string };

    req.investorId = decoded.investorId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};