export default (sequelize, DataTypes) => {
  return sequelize.define('Role', {
    nom: { type: DataTypes.STRING(50), unique: true, allowNull: false }
  });
};