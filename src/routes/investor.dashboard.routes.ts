import express from "express";
import { getInvestorDashboard } from "../controllers/investor.dashboard.controller";
import { investorAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/dashboard", investorAuth, getInvestorDashboard);

export default router;