import mongoose, { Schema, Document } from "mongoose";

export interface IInvestor extends Document {
  name: string;
  email: string;
  contact?: string;

  password: string;
  status: "active" | "inactive";

  investedAmount: number;
  currentBalance: number;

  investedOn: Date;
  nextPayoutDate: Date;

  growthTimeline: {
    date: Date;
    value: number;
  }[];
}

const GrowthSchema = new Schema(
  {
    date: { type: Date, required: true },
    value: { type: Number, required: true },
  },
  { _id: false }
);

const InvestorSchema = new Schema<IInvestor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String },

    password: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    investedAmount: { type: Number, required: true, default: 0 },
    currentBalance: { type: Number, required: true, default: 0 },

    investedOn: { type: Date, required: true },
    nextPayoutDate: { type: Date, required: true },

    growthTimeline: {
      type: [GrowthSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInvestor>("Investor", InvestorSchema);