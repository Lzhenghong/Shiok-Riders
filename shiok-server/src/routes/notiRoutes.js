const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require("../middlewares/requireAuth");
const Hitcher = mongoose.model('Hitcher');
const Driver = mongoose.model('Driver');
const HitcherListing = mongoose.model('HitcherListing');
const DriverListing = mongoose.model('DriverListing');
const HitcherNoti = mongoose.model('hitcherNoti');
const DriverNoti = mongoose.model('driverNoti');

const router = express.Router();

router.use(requireAuth);

router.post('/drivernoti', async(req, res) => {
    const {recipient, type, booking, offer} = req.body;
    const listing = await DriverListing.findById({_id: booking._id});
    if (!listing) {
        return res.status(422).send({ error: 'Unable to find booking' });
    }
    const driver = await Driver.findById({_id: recipient._id});
    if (!driver) {
        return res.status(422).send({ error: 'Unable to find recipient' });
    }
    try {
        const noti = new DriverNoti({recipient: recipient._id, sender: req.user._id, type, booking: booking._id, offer});
        await noti.save();
        res.send('success');
    } catch (err) {
        return res.status(422).send({ error: 'Could not send notification' });
    }
});

module.exports = router;


