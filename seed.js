import bcrypt from 'bcrypt';
import db from './models/index.js';

const { Role, User } = db;

const seed = async () => {
  try {
    await db.sequelize.sync({ force: true }); // Attention : supprime toutes les données !

    // Création des rôles
    const adminRole = await Role.create({ name: 'Admin' });
    const userRole = await Role.create({ name: 'User' });

    // Création d’un utilisateur admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      roleId: adminRole.id,
    });

    console.log('Seed terminé avec succès !');
    process.exit();
  } catch (err) {
    console.error('Erreur lors du seed :', err);
    process.exit(1);
  }
};

seed();
