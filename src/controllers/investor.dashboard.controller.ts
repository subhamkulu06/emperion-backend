import { Response } from "express";
import Investor from "../models/investor";
import { InvestorRequest } from "../middleware/investorAuth";

export const getInvestorDashboard = async (
  req: InvestorRequest,
  res: Response
) => {
  try {
    const investorId = req.investorId;

    const investor = await Investor.findById(investorId);
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }

    res.json({
      profile: {
        name: investor.name,
        email: investor.email,
        contact: investor.contact,
      },
      investment: {
        investedAmount: investor.investedAmount,
        currentBalance: investor.currentBalance,
        investedOn: investor.investedOn,
        nextPayoutDate: investor.nextPayoutDate,
      },
      growth: investor.growthTimeline,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};