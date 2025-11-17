import db from '../models/index.js';
import { validationResult } from 'express-validator';
 
const { Project, Task } = db;
 
// GET all projects (pagination, include Tasks)
export const getAllProjects = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
 
  try {
    const { count, rows } = await Project.findAndCountAll({ include: [Task], limit, offset });
    res.json({ totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page, projects: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// POST create project
export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


