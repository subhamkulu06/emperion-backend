import express from "express";
import { adminAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/me", adminAuth, (_req, res) => {
  res.json({ success: true });
});

export default router;