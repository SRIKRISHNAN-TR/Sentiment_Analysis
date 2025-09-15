import mongoose from "mongoose";
import express from "express";

const FeedbackSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    sentiment: { type: Number, default: 0 },
    summary: { type: String },
    bill_id: { type: String, required: true },
}, { timestamps: true });
export default mongoose.model("Feedback",FeedbackSchema);