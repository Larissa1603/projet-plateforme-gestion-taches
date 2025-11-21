const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { listComments, createComment } = require('../controllers/commentController');

router.get('/:taskId', authenticate, listComments);
router.post('/', authenticate, createComment);

module.exports = router;
