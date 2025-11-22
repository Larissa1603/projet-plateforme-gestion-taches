// controllers/assignmentController.js
import db from "../models/index.js";

export const createAssignment = async (req, res) => {
  try {
    const assignment = await db.Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await db.Assignment.findAll();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};