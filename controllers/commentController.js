const { sequelize, User } = require('../models');
const { DataTypes } = require('sequelize');

const Comment =
  sequelize.models.Comment ||
  require('../models/Comment')(sequelize, DataTypes);

if (!Comment.associations || !Comment.associations.User) {
  User.hasMany(Comment, { foreignKey: 'userId' });
  Comment.belongsTo(User, { foreignKey: 'userId' });
}

const listComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { taskId: req.params.taskId },
      include: [{ model: User, attributes: ['id', 'email', 'name'] }]
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { content, taskId } = req.body;

    const comment = await Comment.create({
      content,
      taskId,
      userId: req.user.id
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listComments, createComment };
