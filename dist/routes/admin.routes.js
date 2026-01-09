"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/dashboard", auth_middleware_1.requireAdmin, admin_controller_1.getDashboardMetrics);
exports.default = router;
