import { Router } from "express";
import {
  registerInvestor,
  loginInvestor,
  getInvestorDashboard,
} from "../controllers/investor.controller";
import { requireInvestorAuth } from "../middleware/investorAuth";

const router = Router();

router.post("/register", registerInvestor);
router.post("/login", loginInvestor);
router.get("/dashboard", requireInvestorAuth, getInvestorDashboard);

export default router;