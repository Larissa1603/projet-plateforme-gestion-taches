export default (sequelize, DataTypes) => {
  return sequelize.define('Project', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE }
  });
};



