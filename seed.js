import db from './models/index.js';
import bcrypt from 'bcrypt';

const { Role, User } = db;

async function seed() {
  await db.sequelize.sync({ force: true });

  const adminRole = await Role.create({ name: 'admin' });
  const userRole = await Role.create({ name: 'user' });

  await User.create({
    email: 'admin@example.com',
    password: await bcrypt.hash('password', 10),
    roleId: adminRole.id
  });

  // Ajoutez des données pour Projects, Tasks, etc.

  console.log('Seed completed');
  process.exit();
}
seed();