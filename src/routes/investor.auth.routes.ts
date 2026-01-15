import express from "express";
import { investorLogin } from "../controllers/investor.auth.controller";

const router = express.Router();

router.post("/auth/login", investorLogin);

export default router;