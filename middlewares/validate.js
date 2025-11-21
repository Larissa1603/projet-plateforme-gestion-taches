export default (sequelize, DataTypes) => {
  return sequelize.define(
    'Role',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'roles', // optional but cleaner
      timestamps: false, // if you don’t have createdAt / updatedAt
    }
  );
};
