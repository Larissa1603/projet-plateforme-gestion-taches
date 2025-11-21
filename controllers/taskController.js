import db from '../models/index.js';
import { validationResult } from 'express-validator';
 
const { Task, Project, Comment } = db;
 
// GET all tasks 
export const getAllTasks = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
 
  try {
    const { count, rows } = await Task.findAndCountAll({
      include: [Project, Comment],
      limit,
      offset
    });
    res.json({ totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page, tasks: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// POST create task
export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// PUT update task
export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// DELETE task
export const deleteTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// GET task by ID
export const getTaskById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const task = await Task.findByPk(req.params.id, { include: [Project, Comment] });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};