import { Router } from "express";
import { investorLogin } from "../controllers/investor.auth.controller";

const router = Router();

/* ===========================
   INVESTOR LOGIN
   POST /api/investor/login
=========================== */
router.post("/login", investorLogin);

export default router;