const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { listComments, createComment } = require('../controllers/commentController');
const { body, param } = require('express-validator');
const validate = require('../middlewares/validate');

router.get('/:taskId',
  [
    param('taskId').isInt()
  ],
  validate,
  authenticate,
  listComments
);

router.post('/',
  [
    body('content').notEmpty(),
    body('taskId').isInt()
  ],
  validate,
  authenticate,
  createComment
);

module.exports = router;

