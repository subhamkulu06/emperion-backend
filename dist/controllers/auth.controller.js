"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const env_1 = require("../config/env");
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin_1.default.findOne({ email });
    console.log("ADMIN FROM DB:", admin);
    if (!admin)
        return res.status(401).json({ message: "Invalid credentials" });
    const ismatch = await bcryptjs_1.default.compare(password, admin.password);
    if (!ismatch)
        return res.status(401).json({ message: "Invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ id: admin._id }, env_1.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token });
};
exports.loginAdmin = loginAdmin;
