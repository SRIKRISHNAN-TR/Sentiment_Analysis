import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

router.post("/feedback", async (req, res) => {
  try {
    const { comment, sentiment, summary } = req.body;

    if (!comment) {
      return res.status(400).json({ error: "Comment is required" });
    }

    const newFeedback = new Feedback({
      comment,
      sentiment,
      summary,
    });

    await newFeedback.save();
    res.status(201).json({
      message: "Feedback saved successfully",
      feedback: newFeedback,
    });
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ GET all feedback
router.get("/feedback", async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: "Error fetching feedback" });
  }
});

export default router;
