import express from "express";
import Problem from "../models/Problem.js";

const router = express.Router();

// GET all problems
router.get("/getbills", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json({ problems });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch problems" });
  }
});

// POST add problem
router.post("/addbills", async (req, res) => {
  try {
    const { title, description ,createdBy} = req.body;

    if (!title?.trim() || !description?.trim() || !createdBy ) {
      return res.status(400).json({ error: "Title and description and Createdby cannot be empty" });
    }
    const newProblem = new Problem({ title, description ,createdBy});
    await newProblem.save();

    res.json({ success: true, problem: newProblem });
  } catch (err) {
    res.status(500).json({ error: "Failed to add problem" });
  }
});

export default router;
