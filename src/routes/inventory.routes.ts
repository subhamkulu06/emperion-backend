import { Router } from "express";
import {
  getInventory,
  updateStock,
} from "../controllers/inventory.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAdmin); // 🔒 ADMIN ONLY

router.get("/", getInventory);
router.patch("/:id", updateStock);

export default router;