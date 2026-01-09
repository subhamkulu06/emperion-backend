import { Request, Response } from "express";
import Product from "../models/Product";

export const createProduct = async (req: any, res: any) => {
  try {
    const { name, description, price, stock } = req.body;

    const image = req.file
      ? `/uploads/products/${req.file.filename}`
      : null;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Product creation failed" });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

export const updateProduct = async (req: Request, res: Response) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated)
    return res.status(404).json({ message: "Product not found" });

  res.json(updated);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);

  if (!deleted)
    return res.status(404).json({ message: "Product not found" });

  res.json({ success: true });
};