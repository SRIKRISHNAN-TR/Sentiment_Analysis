import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  comment: { type: String, required: true },
  sentiment: { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
