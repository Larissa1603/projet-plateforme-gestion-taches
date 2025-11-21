import db from "../config/db.js";
import { DataTypes } from "sequelize";
const Role = db.define('Role', {
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  });

  export default Role;
