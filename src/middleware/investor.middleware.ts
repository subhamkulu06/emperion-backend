import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface InvestorPayload {
  investorId: string;
  role: "investor";
}

export function investorAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Investor token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as InvestorPayload;

    if (decoded.role !== "investor") {
      return res.status(403).json({ message: "Invalid role" });
    }

    // attach investor id to request
    (req as any).investorId = decoded.investorId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}