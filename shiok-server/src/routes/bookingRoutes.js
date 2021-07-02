const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require("../middlewares/requireAuth");
const HitcherBooking = mongoose.model('HitcherBooking');
const DriverBooking = mongoose.model('DriverBooking');

const router = express.Router();

router.use(requireAuth);

router.get('/history', async(req, res) => {
    result = [];
    try {
        const docs = req.user.type == 'Hitcher' ? 
            await HitcherBooking.find({user: req.user._id}).populate('client').sort({createdAt: 'desc'}) : 
            await DriverBooking.find({user: req.user._id}).populate('client').sort({createdAt: 'desc'});
        docs.map(doc => {
            result.push(doc);
        });
        res.send(result);
    } catch (err) {
        return res.status(422).send({ error: 'Could not fetch past bookings' });
    }
});

router.post('/deletehistory', async(req, res) => {
    const {item} = req.body;
    try {
        req.user.type == 'Hitcher' ? await HitcherBooking.findByIdAndDelete({_id: item._id}) : await DriverBooking.findByIdAndDelete({_id: item._id});
        res.send('success');
    } catch (err) {
        return res.status(422).send({error: 'Could not delete record'});
    }
});

router.post('/readhistory', async (req, res) => {
    const {item} = req.body;
    try {
        req.user.type == 'Driver' ? await DriverBooking.findByIdAndUpdate({_id: item._id}, {read: true}) : await HitcherBooking.findByIdAndUpdate({_id: item._id}, {read: true});
        res.send('success');
    } catch (err) {
        return res.status(422).send({error: 'Could not update record'});
    }
});

module.exports = router;


