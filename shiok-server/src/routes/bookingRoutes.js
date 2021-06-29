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
            await HitcherBooking.find({user: req.user._id}).populate('client') : 
            await DriverBooking.find({user: req.user._id}).populate('client');
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

module.exports = router;


