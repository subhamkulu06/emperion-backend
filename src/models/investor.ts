import mongoose, { Schema, Document } from "mongoose";

export interface InvestorDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "investor";
  status: "pending" | "approved" | "rejected";
  investedAmount: number;
  returns: number;
  createdAt: Date;
}

const InvestorSchema = new Schema<InvestorDocument>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "investor",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    investedAmount: {
      type: Number,
      default: 0,
    },

    returns: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<InvestorDocument>(
  "Investor",
  InvestorSchema
);