"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Order_1 = __importDefault(require("../models/Order"));
const getDashboardMetrics = async (_req, res) => {
    try {
        /**
         * PARALLEL EXECUTION (FAST)
         */
        const [totalProducts, activeProducts, totalOrders, pendingOrders, revenueAgg, lowStockProducts,] = await Promise.all([
            Product_1.default.countDocuments(),
            Product_1.default.countDocuments({ active: true }),
            Order_1.default.countDocuments(),
            Order_1.default.countDocuments({ status: "pending" }),
            // ✅ CORRECT WAY: Mongo aggregation for revenue
            Order_1.default.aggregate([
                { $match: { status: "completed" } },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: "$totalAmount" },
                    },
                },
            ]),
            Product_1.default.countDocuments({ stock: { $lte: 5 } }),
        ]);
        const totalRevenue = revenueAgg[0]?.totalRevenue || 0;
        return res.json({
            products: {
                total: totalProducts,
                active: activeProducts,
                lowStock: lowStockProducts,
            },
            orders: {
                total: totalOrders,
                pending: pendingOrders,
            },
            revenue: totalRevenue,
        });
    }
    catch (error) {
        console.error("ADMIN DASHBOARD ERROR:", error);
        return res.status(500).json({
            message: "Failed to fetch dashboard metrics",
        });
    }
};
exports.getDashboardMetrics = getDashboardMetrics;
