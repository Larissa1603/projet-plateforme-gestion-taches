// models/Project.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Project", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};