import mongoose from "mongoose";

const growthSchema = new mongoose.Schema({
  date: String,
  value: Number,
});

const investorSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    contact: String,
    image: String,
    about: String,

    password: String,

    investedAmount: Number,
    currentBalance: Number,
    investedOn: String,
    nextPayoutDate: String,

    growthTimeline: [growthSchema],

    status: {
      type: String,
      enum: ["active", "paused"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Investor", investorSchema);