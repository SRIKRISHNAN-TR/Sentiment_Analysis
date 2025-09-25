import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    createdBy: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Problem", ProblemSchema);
