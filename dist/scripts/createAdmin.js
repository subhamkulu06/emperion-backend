"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Admin_1 = __importDefault(require("../models/Admin"));
const env_1 = require("../config/env");
(async () => {
    try {
        await mongoose_1.default.connect(env_1.env.MONGO_URI);
        console.log("Mongo connected");
        const email = "admin@emperion.com";
        const plainPassword = "emperion@123";
        const hashedPassword = await bcryptjs_1.default.hash(plainPassword, 10);
        await Admin_1.default.findOneAndUpdate({ email }, {
            email,
            password: hashedPassword,
        }, { upsert: true });
        console.log("ADMIN CREATED / UPDATED");
        console.log("EMAIL:", email);
        console.log("PASSWORD:", plainPassword);
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
