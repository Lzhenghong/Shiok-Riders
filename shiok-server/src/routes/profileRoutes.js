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

router.put('/editprofile', async (req, res) => {
    const {username, phoneNumber, teleHandle, licenseNumber} = req.body;
    try {
        (req.user.type == 'Hitcher') 
        ? await Hitcher.updateOne({_id: req.user._id}, {username, phoneNumber, teleHandle}) 
        : await Driver.updateOne({_id: req.user._id}, {username, phoneNumber, licenseNumber, teleHandle});
        res.send('Successfully updated');
    } catch (err) {
        res.send('Update failed');
    }
  });
  
module.exports = router;    