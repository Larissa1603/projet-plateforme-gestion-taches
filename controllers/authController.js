const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email }, include: Role });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.Role.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, user: { email: user.email, role: user.Role.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};