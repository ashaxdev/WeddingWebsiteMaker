import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  key: { type: String, required: true },
  type: { type: String, required: true },
});

const TemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  html: { type: String, required: true },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: true },
  discount: { type: Number, default: 0 },
  fields: { type: [FieldSchema], required: true }, // 👈 updated here
  defaults: { type: mongoose.Schema.Types.Mixed },  // allows any default values
});

export default mongoose.models.Template || mongoose.model("Template", TemplateSchema);