import { Router } from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAdmin); // 🔒 PROTECT ALL

router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:id", updateOrderStatus);

export default router;