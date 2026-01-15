import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface InvestorRequest extends Request {
  investorId?: string;
}

export const investorAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { investorId: string };

    (req as InvestorRequest).investorId = decoded.investorId;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};