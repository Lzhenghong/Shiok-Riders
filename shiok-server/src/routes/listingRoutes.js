const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require("../middlewares/requireAuth");
const HitcherListing = mongoose.model('HitcherListing');
const DriverListing = mongoose.model('DriverListing');

const router = express.Router();

router.use(requireAuth);

router.post('/listing', async (req, res) => {
    const {origin, dest, price} = req.body;
    const lister = req.user;
    try {
        const listing = (lister.type == 'Hitcher') ? new HitcherListing({lister: req.user._id, origin, dest, price}) : new DriverListing({lister: req.user._id, origin, dest, price});
        await listing.save();
        res.send('Success');
    } catch (err) {
        res.send('Error');
    }
});

module.exports = router;