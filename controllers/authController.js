import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const { Utilisateur, Role } = db;

export const login = async (req, res) => {
  const { email, mot_de_passe } = req.body; // Adapté en français
  try {
    const utilisateur = await Utilisateur.findOne({ where: { email }, include: Role });
    if (!utilisateur || !(await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe))) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.Role.nom },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, utilisateur: { email: utilisateur.email, role: utilisateur.Role.nom } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};