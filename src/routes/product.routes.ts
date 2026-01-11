import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import Product from "../models/Product";
import { requireAdmin } from "../middleware/auth.middleware";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* =====================================================
   PUBLIC PRODUCTS (NO AUTH) — FOR WEBSITE
   GET /api/products/public
===================================================== */
router.get("/public", async (req, res) => {
  try {
    const products = await Product.find({ active: true }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load products" });
  }
});

/* =====================================================
   CREATE PRODUCT (ADMIN ONLY)
   POST /api/products
===================================================== */
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, category, stock } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image required" });
      }

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "emperion/products" },
              (err, result) => {
                if (err || !result) reject(err);
                else resolve({ secure_url: result.secure_url });
              }
            )
            .end(req.file.buffer);
        }
      );

      const product = await Product.create({
        name,
        category,
        price: Number(price),
        stock: Number(stock),
        image: uploadResult.secure_url,
        active: true,
      });

      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Product creation failed" });
    }
  }
);

/* =====================================================
   ADMIN PRODUCTS (PROTECTED)
   GET /api/products
===================================================== */
router.get("/", requireAdmin, async (_, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

export default router;