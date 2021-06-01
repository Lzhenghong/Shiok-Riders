const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require("../middlewares/requireAuth");
const Hitcher = mongoose.model('Hitcher');
const Driver = mongoose.model('Driver');

const router = express.Router();

router.use(requireAuth);

router.get('/profile', async (req, res) => {
    res.send(req.user);
  });

router.post('/editprofile', async (req, res) => {
    const {username, phoneNumber} = req.body;
    try {
        (req.user.type == 'Hitcher') 
        ? await Hitcher.updateOne({_id: req.user._id}, {username, phoneNumber}) 
        : await Driver.updateOne({_id: req.user._id}, {username, phoneNumber});
        res.send(req.user);
    } catch (err) {
        res.send('cannot update');
    }
  });
  
module.exports = router;    