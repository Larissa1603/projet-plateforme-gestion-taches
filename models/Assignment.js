// models/Assignment.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Assignment", {
    task: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assignee: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};