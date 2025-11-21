import express from 'express';
//import { getUsers, createUser, login } from '../controllers/userController.js';
import { body } from 'express-validator';
//import auth from '../middleware/auth.js';
import { createUser, getUsers, login } from '../controllers/userControllers.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post(
  '/register',
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  createUser
);

router.post('/login', body('email').isEmail(), body('password').notEmpty(), login);

router.get('/', getUsers); // JWT protection

export default router;

