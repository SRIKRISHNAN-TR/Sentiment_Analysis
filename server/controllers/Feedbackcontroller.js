import Feedback from "../models/Feedback.js";
import { analyzeComment } from "../services/geminiservice.js";

export async function submitFeedback(req, res) {
  try {
    const { comment, bill_id } = req.body;
    if (!comment) return res.status(400).json({ error: "Comment is required" });
    if (!bill_id) return res.status(400).json({ error: "bill_id is required" });

    const analysis = await analyzeComment(comment);

    const feedback = new Feedback({
      bill_id,
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
    const { bill_id } = req.query;
    const filter = bill_id ? { bill_id } : {};
    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
