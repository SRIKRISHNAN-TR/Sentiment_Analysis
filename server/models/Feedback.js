import mongoose from "mongoose";
import express from "express";

const FeedbackSchema = new mongoose.Schema({
    comment:{type: String, reqiured :true},
    sentiment :{type: String, default:"neutral"},
    summary : {type: String},
    keywords: { type: [String], default: [] },
}, { timestamps: true });
export default mongoose.model("Feedback",FeedbackSchema);