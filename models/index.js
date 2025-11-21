// //import Sequelize from 'sequelize';
// import db from '../config/db.js';
// import defineUser from './user.js';
// import defineRole from './role.js';

// //const sequelize = new Sequelize(dbConfig);

// const models = {};
// models.Role = defineRole(sequelize, Sequelize.DataTypes);
// models.User = defineUser(sequelize, Sequelize.DataTypes);

// // Setup associations
// Object.keys(models).forEach((modelName) => {
//   if (models[modelName].associate) {
//     models[modelName].associate(models);
//   }
// });

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

// export default models;

import User from './User.js';
import Role from './Role.js';   

User.belongsToMany(Role, { through: 'UserRoles', foreignKey: 'userId' });
Role.belongsToMany(User, { through: 'UserRoles', foreignKey: 'roleId' });

export {User, Role };