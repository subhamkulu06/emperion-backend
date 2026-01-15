import { Router } from "express";
import { requireInvestor } from "../middleware/investor.middleware";
import { getInvestorDashboard } from "../controllers/investor.dashboard.controller";

const router = Router();

/* ===========================
   INVESTOR DASHBOARD
   GET /api/investor/dashboard
=========================== */
router.get("/dashboard", requireInvestor, getInvestorDashboard);

export default router;