"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const inventory_routes_1 = __importDefault(require("./routes/inventory.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const investor_routes_1 = __importDefault(require("./routes/investor.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.use("/api/inventory", inventory_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api/investors", investor_routes_1.default);
app.use(error_middleware_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Emperion Backend Live");
});
exports.default = app;
