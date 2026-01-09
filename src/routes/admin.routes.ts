import { Router } from "express";
import { getDashboardMetrics } from "../controllers/admin.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/dashboard", requireAdmin, getDashboardMetrics);

export default router;