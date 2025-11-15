export default (sequelize, DataTypes) => {
  return sequelize.define('Utilisateur', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    mot_de_passe: { type: DataTypes.STRING, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false }
  });
};