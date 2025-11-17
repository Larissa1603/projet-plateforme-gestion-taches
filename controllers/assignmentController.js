import db from '../models/index.js';
import { validationResult } from 'express-validator';
 
const { Assignment, Task, User } = db;
 
// GET all assignments (pagination, include relations)
export const getAllAssignments = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
 
  try {
    const { count, rows } = await Assignment.findAndCountAll({ include: [Task, User], limit, offset });
    res.json({ totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page, assignments: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// POST create assignment
export const createAssignment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  const { taskId, userId } = req.body;
  try {
    const assignment = await Assignment.create({ taskId, userId });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// PUT update assignment
export const updateAssignment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    await assignment.update(req.body);
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// DELETE assignment
export const deleteAssignment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    await assignment.destroy();
    res.json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// GET assignment by ID
export const getAssignmentById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const assignment = await Assignment.findByPk(req.params.id, { include: [Task, User] });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};