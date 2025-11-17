import express from 'express';
import { getAllComments, createComment, updateComment, deleteComment, getCommentById } from '../controllers/commentController.js';
import { body, param, query } from 'express-validator';
import validate from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/auth.js';
 
const router = express.Router();
 
router.get('/', verifyToken, [
  query('page').optional().isInt({ min: 1 }).withMessage('Invalid page'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Invalid limit')
], validate, getAllComments);
 
router.get('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID')
], validate, getCommentById);
 
router.post('/', verifyToken, [
  body('content').notEmpty().withMessage('Content required'),
  body('taskId').isInt().withMessage('Invalid task ID')
], validate, createComment);
 
router.put('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID'),
  body('content').optional().notEmpty()
], validate, updateComment);
 
router.delete('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID')
], validate, deleteComment);
 
export default router;

