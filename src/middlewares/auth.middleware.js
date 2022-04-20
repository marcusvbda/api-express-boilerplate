const UserModel = require('@src/models/user.model');
const jwt = require('jsonwebtoken');

const Auth = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').split(' ')[1] || '';
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await UserModel.findById(decoded);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send({ error: 'invalid token' });
    }
  } catch (err) {
    res.status(401).send({ error: 'invalid token' });
  }
};

module.exports = { Auth };
