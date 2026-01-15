import express from "express";
import {
  createInvestor,
  updateInvestor,
  listInvestors,
} from "../controllers/adminInvestor.controller";
import { adminAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", adminAuth, listInvestors);
router.post("/", adminAuth, createInvestor);
router.put("/:id", adminAuth, updateInvestor);

export default router;