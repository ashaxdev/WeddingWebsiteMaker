import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    url: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    name: String,
  },
  { timestamps: true }
);

// ✅ Index
MediaSchema.index({ userId: 1 });

export default mongoose.models.Media ||
  mongoose.model("Media", MediaSchema);