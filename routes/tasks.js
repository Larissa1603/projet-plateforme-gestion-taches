import express from 'express';
import { getAllTasks, createTask, updateTask, deleteTask, getTaskById } from '../controllers/taskController.js';
import { body, param, query } from 'express-validator';
import validate from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/auth.js';
 
const router = express.Router();
 
router.get('/', verifyToken, [
  query('page').optional().isInt({ min: 1 }).withMessage('Invalid page'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Invalid limit')
], validate, getAllTasks);
 
router.get('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID')
], validate, getTaskById);
 
router.post('/', verifyToken, [
  body('title').notEmpty().withMessage('Title required'),
  body('projectId').isInt().withMessage('Invalid project ID')
], validate, createTask);
 
router.put('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID'),
  body('title').optional().notEmpty(),
  body('status').optional().isIn(['pending', 'in_progress', 'completed'])
], validate, updateTask);
 
router.delete('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID')
], validate, deleteTask);
 
export default router;
