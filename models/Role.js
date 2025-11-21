// models/Role.js
// export default (sequelize, DataTypes) => {
//   const Role = sequelize.define('Role', {
//     name: { type: DataTypes.STRING, allowNull: false, unique: true },
//   });
//   Role.associate = (models) => {
//     Role.hasMany(models.User, { foreignKey: 'roleId' });
//   };
//   return Role;
// };

import db from "../config/db.js";
import { DataTypes } from "sequelize";
const Role = db.define('Role', {
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  });

  export default Role;
