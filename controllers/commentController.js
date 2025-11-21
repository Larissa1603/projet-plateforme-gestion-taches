import db from '../models/index.js';
import { validationResult } from 'express-validator';
 
const { Comment, Task, User } = db;
 
// GET all comments 
export const getAllComments = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
 
  try {
    const { count, rows } = await Comment.findAndCountAll({
      include: [Task, User],
      limit,
      offset
    });
    res.json({ totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page, comments: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// POST create comment
export const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  const { content, taskId } = req.body;
  try {
    const comment = await Comment.create({ content, taskId, userId: req.userId }); // userId from JWT
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// PUT update comment
export const updateComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    await comment.update(req.body);
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// DELETE comment
export const deleteComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    await comment.destroy();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// GET comment by ID
export const getCommentById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
 
  try {
    const comment = await Comment.findByPk(req.params.id, { include: [Task, User] });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};