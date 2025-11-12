module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Role', {
    name: { type: DataTypes.STRING(50), unique: true, allowNull: false }
  });
};