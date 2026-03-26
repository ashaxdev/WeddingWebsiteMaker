import mongoose from "mongoose";

const QrSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    color: {
      type: String,
      default: "#000000",
    },

    logo: String,

    size: {
      type: Number,
      default: 200,
    },
  },
  { timestamps: true }
);

// ✅ Index
QrSchema.index({ projectId: 1 });

export default mongoose.models.QrCode ||
  mongoose.model("QrCode", QrSchema);