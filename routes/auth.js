const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], validate, login);

module.exports = router;