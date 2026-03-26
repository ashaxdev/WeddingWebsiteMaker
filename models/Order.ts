import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentId: String, // Razorpay payment ID
    orderId: String,   // Razorpay order ID

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ Indexes
OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);