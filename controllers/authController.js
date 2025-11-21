import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../index.js';

const { User, Role } = db;

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email: email.toLowerCase() },
      include: Role
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.Role.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.Role.name
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
