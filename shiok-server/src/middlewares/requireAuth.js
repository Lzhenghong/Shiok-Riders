const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Hitcher = mongoose.model('Hitcher');
const Driver = mongoose.model('Driver');

module.exports = (req, res, next) => {
  const { authorization, type } = req.headers;

  if (!authorization || !type) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;

    const user = (type == 'Hitcher') ? await Hitcher.findById(userId) : await Driver.findById(userId);
    req.user = user;
    next();
  });
};
