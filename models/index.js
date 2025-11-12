const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Role = require('./Role')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);

Role.hasMany(User);
User.belongsTo(Role);

module.exports = { sequelize, Role, User };