import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    userEmail: String,
    templateId: String,
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", PurchaseSchema);