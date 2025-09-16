import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  bill_id: { type: mongoose.Schema.Types.ObjectId, ref: "Bill", required: true }, 
  comment: { type: String, required: true },
  sentiment: { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },
  summary: { type: String },
  keywords: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
