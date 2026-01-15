import { Router } from "express";
import {
  getInventory,
  updateStock,
} from "../controllers/inventory.controller";
import { adminAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(adminAuth); // 🔒 ADMIN ONLY

router.get("/", getInventory);
router.patch("/:id", updateStock);

export default router;