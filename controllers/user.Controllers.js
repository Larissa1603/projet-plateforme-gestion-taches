import bcrypt from 'bcrypt';
import db from '../models/index.js';
import { validationResult } from 'express-validator';

const { User, Role } = db;

export const getAllUsers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await User.findAndCountAll({ include: Role, limit, offset });
    res.json({ total: count, page, limit, users: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, roleId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, roleId });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ajoutez getUserById, updateUser, deleteUser de manière similaire (avec validations et include Role).