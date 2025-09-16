import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// GET all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json({ feedbacks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add feedback
router.post("/add", async (req, res) => {
  try {
    const { problemId, comment, sentiment } = req.body;
    if (!problemId || !comment) return res.status(400).json({ error: "Missing fields" });

    const newFeedback = new Feedback({ problemId, comment, sentiment });
    const savedFeedback = await newFeedback.save();
    res.status(201).json({ feedback: savedFeedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
