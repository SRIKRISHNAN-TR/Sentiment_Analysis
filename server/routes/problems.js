import express from "express";
import Problem from "../models/Problem.js";

const router = express.Router();

// GET all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json({ problems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new problem
router.post("/add", async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    
    // Validation
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
    
    const newProblem = new Problem({ 
      title, 
      description, 
      createdBy: createdBy || "admin" 
    });
    
    await newProblem.save();
    res.status(201).json({ problem: newProblem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;