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
    const submitted = await DriverNoti.find({sender: req.user._id, booking: booking._id});
    if (submitted.length > 0) {
        return res.status(422).send({error: 'Already submitted an offer'});
    }
    try {
        const noti = new DriverNoti({recipient: recipient._id, sender: req.user._id, type, booking: booking._id, offer});
        await noti.save();
        res.send('success');
    } catch (err) {
        return res.status(422).send({ error: 'Could not send notification' });
    }
});

router.get('/bookingnoti', async(req, res) => {
    const result = [];
    try {
        const docs = req.user.type == 'Driver' ? 
            await DriverListing.find({recipient: req.user._id, $or: [{type: 'Offer'}, {type: 'Result'}]}).populate('sender') : 
            await HitcherListing.find({recipient: req.user._id, $or: [{type: 'Offer'}, {type: 'Result'}]}).populate('sender');
        docs.map(async (doc) => {
            const listing = (req.user.type == 'Driver') ? await DriverListing.findById({_id: doc.booking}) : await HitcherListing.findById({_id: doc.booking});
            if (listing) {
                result.push({...doc, expired: false});
            } else {
                result.push({...doc, expired: true});
            }
        });
        res.send(result);
    } catch {
        return res.status(422).send({ error: 'Could not fetch notifications' });
    }
});

module.exports = router;


