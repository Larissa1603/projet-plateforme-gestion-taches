const { Comment } = require('../models');

const listComments = async (req, res) => {
  const comments = await Comment.findAll({ where: { taskId: req.params.taskId } });
  res.json(comments);
};

const createComment = async (req, res) => {
  const { content, taskId } = req.body;
  const comment = await Comment.create({ content, taskId, userId: req.user.id });
  res.status(201).json(comment);
};

module.exports = { listComments, createComment };
