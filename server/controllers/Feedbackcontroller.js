import Feedback from "../models/Feedback.js";
import { analyzeComment } from "../services/geminiservice.js";

export async function submitFeedback(req, res) {
  try {
    const { comment, bill_id } = req.body;
    if (!comment) return res.json({ error: "Comment is required" });
    if (!bill_id) return res.json({ error: "bill_id is required" });

    const analysis = await analyzeComment(comment);

    const feedback = new Feedback({
      comment,
      sentiment: analysis.sentiment || "neutral",
      summary: analysis.summary || comment,
      bill_id,
      keywords: analysis.keywords || []
    });

    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.json({ error: "Server error" });
  }
}

export async function getAllFeedback(req, res) {
  try {
    const { bill_id } = req.query;
    let filter = {};
    if (bill_id) {
      filter.bill_id = bill_id;
    }
    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.json({ error: "Server error" });
  }
}
