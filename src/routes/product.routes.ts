import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { requireAdmin } from "../middleware/auth.middleware";
import { upload } from "../config/multer";

const router = Router();

router.use(requireAdmin); // 🔐 PROTECT ALL BELOW
router.post("/",
  requireAdmin,
  upload.single("image"),
  createProduct
)
router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;