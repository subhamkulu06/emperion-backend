"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_1 = require("../config/multer");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.requireAdmin); // 🔐 PROTECT ALL BELOW
router.post("/", auth_middleware_1.requireAdmin, multer_1.upload.single("image"), product_controller_1.createProduct);
router.post("/", product_controller_1.createProduct);
router.get("/", product_controller_1.getProducts);
router.put("/:id", product_controller_1.updateProduct);
router.delete("/:id", product_controller_1.deleteProduct);
exports.default = router;
