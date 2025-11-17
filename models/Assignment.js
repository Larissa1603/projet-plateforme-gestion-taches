export default (sequelize, DataTypes) => {
  return sequelize.define('Assignment', {
    taskId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Task (from Member 3)
    userId: { type: DataTypes.INTEGER, allowNull: false }  // FK to User (from Member 1)
  });
};