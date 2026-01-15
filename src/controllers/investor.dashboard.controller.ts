import { Request, Response } from "express";
import Investor from "../models/investor";

/**
 * GET /api/investor/dashboard
 * Protected by investorAuth middleware
 */
export const getInvestorDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    // investorAuth middleware attaches investorId
    const investorId = (req as any).investorId;

    if (!investorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const investor = await Investor.findById(investorId);

    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }

    res.json({
      profile: {
        name: investor.name,
        email: investor.email,
        contact: investor.contact,
        status: investor.status,
      },
      investment: {
        investedAmount: investor.investedAmount,
        currentBalance: investor.currentBalance,
        investedOn: investor.investedOn,
        nextPayoutDate: investor.nextPayoutDate,
      },
      growth: investor.growthTimeline || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};