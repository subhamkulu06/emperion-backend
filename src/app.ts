import express, { Request, Response } from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import inventoryRoutes from "./routes/inventory.routes";
import adminRoutes from "./routes/admin.routes";
import investorRoutes from "./routes/investor.routes";

import { errorHandler } from "./middleware/error.middleware";

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/investors", investorRoutes);

/* ================= STATIC ================= */
app.use("/uploads", express.static("uploads"));

/* ================= HEALTH ================= */
app.get("/test", (_req: Request, res: Response) => {
  res.send("Emperion Backend Live");
});

/* ================= ERROR ================= */
app.use(errorHandler);

export default app;