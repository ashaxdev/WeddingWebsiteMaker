import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    templateId: String,
    brideName: String,
    groomName: String,
    date: String,
    venue: String,
    image: String,
    color: String,

    slug: { type: String, unique: true }, // ✅ SEO URL
  },
  { timestamps: true }
);

ProjectSchema.index({ slug: 1 });

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);