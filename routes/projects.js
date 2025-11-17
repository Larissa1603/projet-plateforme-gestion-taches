import express from 'express';
import { getAllProjects, createProject, updateProject, deleteProject, getProjectById } from '../controllers/projectController.js';
import { body, param, query } from 'express-validator';
import validate from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/auth.js';
 
const router = express.Router();
 
router.get('/', verifyToken, [
  query('page').optional().isInt({ min: 1 }).withMessage('Invalid page'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Invalid limit')
], validate, getAllProjects);
 
router.get('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID')
], validate, getProjectById);
 
router.post('/', verifyToken, [
  body('name').notEmpty().withMessage('Name required')
], validate, createProject);
 
router.put('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID'),
  body('name').optional().notEmpty()
], validate, updateProject);
 
router.delete('/:id', verifyToken, [
  param('id').isInt().withMessage('Invalid ID')
], validate, deleteProject);
 
export default router;