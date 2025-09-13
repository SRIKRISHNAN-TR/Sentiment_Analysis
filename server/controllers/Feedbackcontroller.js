import Feedback from "../models/Feedback.js";
import { analyzeComment } from "../services/geminiservice.js";

export async function submitFeedback(req, res) {
  try {
    const { comment } = req.body;
    if (!comment) return res.status(400).json({ error: "Comment is required" });

    // Call Gemini for analysis
    const analysis = await analyzeComment(comment);

    const feedback = new Feedback({
      comment,
      sentiment: analysis.sentiment || "neutral",
      summary: analysis.summary || comment,
      keywords: analysis.keywords || []
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getAllFeedback(req, res) {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
