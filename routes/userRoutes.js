import express from 'express';
import { login } from '../controllers/authController.js';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], validate, login);
router.get('/', verifyToken, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1 })
], validate, getAllUsers);

router.post('/', verifyToken, isAdmin, [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('roleId').isInt()
], validate, createUser);

// Ajoutez PUT/:id, DELETE/:id, GET/:id avec validations et auth.
export default router;