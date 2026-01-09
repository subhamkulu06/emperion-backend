import { Request, Response } from "express";
import Product from "../models/Product";

/**
 * GET INVENTORY
 */
export const getInventory = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().select(
      "name stock active price image createdAt"
    );

    res.json(products);
  } catch {
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
};

/**
 * UPDATE STOCK
 */
export const updateStock = async (req: Request, res: Response) => {
  try {
    const { stock, active } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...(stock !== undefined && { stock }),
        ...(active !== undefined && { active }),
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch {
    res.status(500).json({ message: "Inventory update failed" });
  }
};