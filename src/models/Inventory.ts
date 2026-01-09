import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    stock: Number
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", InventorySchema);