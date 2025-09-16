import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Problem", problemSchema);
