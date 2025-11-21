// // models/User.js
// export default (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     name: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//   });
//   User.associate = (models) => {
//     User.belongsTo(models.Role, { foreignKey: 'roleId' });
//   };
//   return User;
// };

import db from "../config/db.js";
import { DataTypes } from "sequelize";
const User = db.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });

export default User;