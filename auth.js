const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token manquant' });

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, { include: Role });
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    req.user = {
      id: user.id,
      email: user.email,
      role: user.Role ? user.Role.name : null
    };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};


