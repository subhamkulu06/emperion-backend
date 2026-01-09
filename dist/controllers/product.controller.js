"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const image = req.file
            ? `/uploads/products/${req.file.filename}`
            : null;
        const product = await Product_1.default.create({
            name,
            description,
            price,
            stock,
            image,
        });
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ message: "Product creation failed" });
    }
};
exports.createProduct = createProduct;
const getProducts = async (_req, res) => {
    const products = await Product_1.default.find().sort({ createdAt: -1 });
    res.json(products);
};
exports.getProducts = getProducts;
const updateProduct = async (req, res) => {
    const updated = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated)
        return res.status(404).json({ message: "Product not found" });
    res.json(updated);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const deleted = await Product_1.default.findByIdAndDelete(req.params.id);
    if (!deleted)
        return res.status(404).json({ message: "Product not found" });
    res.json({ success: true });
};
exports.deleteProduct = deleteProduct;
