import express from 'express';
import { getAllAssignments, createAssignment, updateAssignment, deleteAssignment, getAssignmentById } from '../controllers/assignmentController.js';
import { body, param, query } from 'express-validator';
import validate from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/auth.js';
 
const router = express.Router();
 
router.get('/', verifyToken, [
  query('page').optional().isInt({ min: 1 }).withMessage('Invalid page'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Invalid limit')
], validate, getAllAssignments);
 
router.get('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID')
], validate, getAssignmentById);
 
router.post('/', verifyToken, [
  body('taskId').isInt().withMessage('Invalid task ID'),
  body('userId').isInt().withMessage('Invalid user ID')
], validate, createAssignment);
 
router.put('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID'),
  body('taskId').optional().isInt(),
  body('userId').optional().isInt()
], validate, updateAssignment);
 
router.delete('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID')
], validate, deleteAssignment);
 
export default router;