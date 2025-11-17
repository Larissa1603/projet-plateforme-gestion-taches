const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Role = require('./Role')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, Role, User, Comment };
