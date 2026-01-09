"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Product_1 = __importDefault(require("../models/Product"));
/**
 * CREATE ORDER
 */
const createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No products provided" });
        }
        let totalAmount = 0;
        const orderProducts = [];
        for (const item of products) {
            const product = await Product_1.default.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            if (product.stock < item.quantity) {
                return res
                    .status(400)
                    .json({ message: `Insufficient stock for ${product.name}` });
            }
            product.stock -= item.quantity;
            await product.save();
            totalAmount += product.price * item.quantity;
            orderProducts.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
            });
        }
        const order = await Order_1.default.create({
            products: orderProducts,
            totalAmount,
        });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Order creation failed" });
    }
};
exports.createOrder = createOrder;
/**
 * GET ALL ORDERS
 */
const getOrders = async (_req, res) => {
    try {
        const orders = await Order_1.default.find().sort({ createdAt: -1 });
        res.json(orders);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
exports.getOrders = getOrders;
/**
 * UPDATE ORDER STATUS
 */
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    }
    catch {
        res.status(500).json({ message: "Failed to update order" });
    }
};
exports.updateOrderStatus = updateOrderStatus;
