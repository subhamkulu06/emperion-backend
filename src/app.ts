import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import inventoryRoutes from "./routes/inventory.routes";
import adminRoutes from "./routes/admin.routes";
import { errorHandler } from "./middleware/error.middleware";
import investorRoutes from "./routes/investor.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads",express.static("uploads"));
app.use("/api/investors", investorRoutes);

app.use(errorHandler);
app.get("/", (req,res) => {
    res.send("Emperion Backend Live");
});

export default app;