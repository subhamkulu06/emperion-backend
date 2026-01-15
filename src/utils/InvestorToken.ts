import jwt from "jsonwebtoken";

export function generateInvestorToken(investorId: string) {
  return jwt.sign(
    { investorId, role: "investor" },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
}