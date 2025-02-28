import express from "express";
import Issue from "../models/Issue.js";

const router = express.Router();

// 1️⃣ Get all issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2️⃣ Get issues by category
router.get("/:category", async (req, res) => {
  try {
    const issues = await Issue.find({ category: req.params.category });
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3️⃣ Create a new issue
router.post("/", async (req, res) => {
  try {
    const { category, title, description } = req.body;
    const newIssue = new Issue({ category, title, description });
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4️⃣ Update issue status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5️⃣ Delete an issue
router.delete("/:id", async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
