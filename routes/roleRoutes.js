import express from 'express';
//import { getRoles, createRole, updateRole, deleteRole } from '../controllers/roleController.js';
import { body, param } from 'express-validator';
import auth from '../middlewares/auth';
//import auth from '../middleware/auth.js';

const roleRoutes = express.Router();

// Route pour créer un rôle
roleRoutes.post(
  '/',
  auth, // protection JWT
  body('name').notEmpty().withMessage('Le nom du rôle est requis'),
  createRole
);

// Route pour récupérer tous les rôles
roleRoutes.get('/', auth, ); // protection JWT

// Route pour mettre à jour un rôle
roleRoutes.put(
  '/:id',
  auth,
  param('id').isInt().withMessage('ID du rôle invalide'),
  body('name').notEmpty().withMessage('Le nom du rôle est requis'),
  updateRole
);

// Route pour supprimer un rôle
roleRoutes.delete(
  '/:id',
  auth,
  param('id').isInt().withMessage('ID du rôle invalide'),
  deleteRole
);

export default roleRoutes;
