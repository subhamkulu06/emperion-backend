import { Router } from "express";
import { investorLogin } from "../controllers/investor.auth.controller";
import { getInvestorDashboard } from "../controllers/investor.dashboard.controller";
import { investorAuth } from "../middleware/investorAuth";

const router = Router();

router.post("/login", investorLogin);
router.get("/dashboard", investorAuth, getInvestorDashboard);

export default router;