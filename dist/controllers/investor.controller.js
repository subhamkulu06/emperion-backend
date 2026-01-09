"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvestorDashboard = exports.loginInvestor = exports.registerInvestor = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const investor_1 = __importDefault(require("../models/investor"));
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * REGISTER INVESTOR (PENDING)
 */
const registerInvestor = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await investor_1.default.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Investor already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await investor_1.default.create({
            name,
            email,
            password: hashedPassword,
            status: "pending",
            role: "investor",
            investedAmount: 0,
            returns: 0,
        });
        res.status(201).json({
            message: "Registration successful. Await admin approval.",
        });
    }
    catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
};
exports.registerInvestor = registerInvestor;
/**
 * LOGIN INVESTOR (APPROVED ONLY)
 */
const loginInvestor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const investor = await investor_1.default.findOne({ email });
        if (!investor) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if (investor.status !== "approved") {
            return res.status(403).json({ message: "Investor not approved yet" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, investor.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: investor._id, role: "investor" }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
};
exports.loginInvestor = loginInvestor;
/**
 * INVESTOR DASHBOARD
 */
const getInvestorDashboard = async (req, res) => {
    try {
        const investor = await investor_1.default.findById(req.investorId).select("-password");
        if (!investor) {
            return res.status(404).json({ message: "Investor not found" });
        }
        res.json({
            name: investor.name,
            investedAmount: investor.investedAmount,
            returns: investor.returns,
            balance: investor.investedAmount + investor.returns,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch dashboard" });
    }
};
exports.getInvestorDashboard = getInvestorDashboard;
