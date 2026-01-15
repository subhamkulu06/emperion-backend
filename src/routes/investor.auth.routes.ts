import express from "express";
import { investorLogin } from "../controllers/investor.auth.controller";

const router = express.Router();

// POST /api/investor/auth/login
router.post("/auth/login", investorLogin);

export default router;