export default (sequelize, DataTypes) => {
  return sequelize.define('Comment', {
    content: { type: DataTypes.TEXT, allowNull: false },
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  });
};