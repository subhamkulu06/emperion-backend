import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import Product from "../models/Product";
import { adminAuth } from "../middleware/auth.middleware";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* =====================================================
   PUBLIC PRODUCTS (NO AUTH)
   GET /api/products
===================================================== */
router.get("/", async (_req, res) => {
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
   ADMIN PRODUCTS (PROTECTED)
   GET /api/products/admin
===================================================== */
router.get("/admin", adminAuth, async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load admin products" });
  }
});

/* =====================================================
   CREATE PRODUCT (ADMIN ONLY)
   POST /api/products
===================================================== */
router.post(
  "/",
  adminAuth,
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
   DELETE PRODUCT (ADMIN ONLY)
   DELETE /api/products/:id
===================================================== */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;