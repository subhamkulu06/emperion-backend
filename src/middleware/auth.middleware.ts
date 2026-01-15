import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const adminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Admin token missing" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    (req as any).adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid admin token" });
  }
};