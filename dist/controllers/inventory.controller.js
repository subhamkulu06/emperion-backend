"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStock = exports.getInventory = void 0;
const Product_1 = __importDefault(require("../models/Product"));
/**
 * GET INVENTORY
 */
const getInventory = async (_req, res) => {
    try {
        const products = await Product_1.default.find().select("name stock active price image createdAt");
        res.json(products);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch inventory" });
    }
};
exports.getInventory = getInventory;
/**
 * UPDATE STOCK
 */
const updateStock = async (req, res) => {
    try {
        const { stock, active } = req.body;
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, {
            ...(stock !== undefined && { stock }),
            ...(active !== undefined && { active }),
        }, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch {
        res.status(500).json({ message: "Inventory update failed" });
    }
};
exports.updateStock = updateStock;
