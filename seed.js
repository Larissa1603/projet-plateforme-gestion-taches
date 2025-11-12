const { sequelize, Role, User } = require('./models');
const bcrypt = require('bcrypt');

async function seed() {
  await sequelize.sync({ force: true });
  const adminRole = await Role.create({ name: 'admin' });
  const hashed = await bcrypt.hash('123456', 10);
  await User.create({
    email: 'admin@taches.com',
    password: hashed,
    name: 'Admin',
    roleId: adminRole.id
  });
  console.log('SEED OK ! Admin: admin@taches.com / 123456');
  process.exit();
}

seed();