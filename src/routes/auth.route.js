const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('@src/models/user.model');
const debug = require('console-development');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// candidato@diwe.com.br
// candidato#challenge
router.post(
  '/login',
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const { email, password } = req.body;
      debug.log('auth login', email, password);
      const user = await UserModel.findOne({ email });
      if (bcrypt.compareSync(password, user.password)) {
        const token = await jwt.sign(user.id, process.env.PRIVATE_KEY);
        return res.send({ token });
      }
      return res.send({ error: 'invalid credentials' }, 403);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
);

module.exports = router;
