export default (sequelize, DataTypes) => {
  return sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    priority: { type: DataTypes.INTEGER, defaultValue: 1 },
    dueDate: { type: DataTypes.DATE },
    projectId: { type: DataTypes.INTEGER, allowNull: false } // FK to Project 
  });
};