const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Hitcher = mongoose.model('Hitcher');
const Driver = mongoose.model('Driver');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, type, phoneNumber } = req.body;

  try {
    const user = (type == 'Hitcher') ? new Hitcher({ email, password, phoneNumber }) : new Driver({email, password, phoneNumber});
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password, type } = req.body;

  if (!email || !password || !type) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = (type == 'Hitcher') ? await Hitcher.findOne({ email }) : await Driver.findOne({email});
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({token});
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;

