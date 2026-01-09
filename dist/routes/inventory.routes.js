"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_controller_1 = require("../controllers/inventory.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.requireAdmin); // 🔒 ADMIN ONLY
router.get("/", inventory_controller_1.getInventory);
router.patch("/:id", inventory_controller_1.updateStock);
exports.default = router;
