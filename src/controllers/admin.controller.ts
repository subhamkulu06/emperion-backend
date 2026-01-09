import { Request, Response } from "express";
import Product from "../models/Product";
import Order from "../models/Order";

export const getDashboardMetrics = async (_req: Request, res: Response) => {
  try {
    /**
     * PARALLEL EXECUTION (FAST)
     */
    const [
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      revenueAgg,
      lowStockProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ active: true }),
      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),

      // ✅ CORRECT WAY: Mongo aggregation for revenue
      Order.aggregate([
        { $match: { status: "completed" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]),

      Product.countDocuments({ stock: { $lte: 5 } }),
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
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch dashboard metrics",
    });
  }
};