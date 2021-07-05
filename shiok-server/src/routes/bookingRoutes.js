const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require("../middlewares/requireAuth");
const HitcherBooking = mongoose.model('HitcherBooking');
const DriverBooking = mongoose.model('DriverBooking');
const Driver = mongoose.model('Driver');
const Hitcher = mongoose.model('Hitcher');
const HitcherNoti = mongoose.model('hitcherNoti');
const DriverNoti = mongoose.model('driverNoti');

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

router.post('/rate', async (req, res) => {
    const {item, rating} = req.body;
    try {
        req.user.type == 'Hitcher' ? 
            await HitcherBooking.findByIdAndUpdate({_id: item._id}, {rated: true}) : 
            await DriverBooking.findByIdAndUpdate({_id: item._id}, {rated: true});
        const client = item.client.type == 'Hitcher' ? await Hitcher.findById({_id: item.client._id}) : await Driver.findById({_id: item.client._id});
        const newLen = client.rating.get('len') + 1;
        const newAverage = (client.rating.get('average') + rating) / newLen;
        item.client.type == 'Hitcher' ?
            await Hitcher.findByIdAndUpdate({_id: item.client._id}, {rating: {'average': newAverage, 'len': newLen}}) :
            await Driver.findByIdAndUpdate({_id: item.client._id}, {rating: {'average': newAverage, 'len': newLen}});
        res.send('success');
    } catch (err) {
        return res.status(422).send({error: 'Could not update rating'});
    }
});

router.post('/addfriend', async (req, res) => {
    const {client} = req.body;
    try {
        const user = req.user.type == 'Hitcher' ? await Hitcher.findById({_id: req.user._id}) : await Driver.findById({_id: req.user._id});
        if (user.friends.has(client._id.toString())) {
            return res.status(422).send({error: 'Existing friend'});
        }
        user.friends.set(client._id.toString(), client._id);
        req.user.type == 'Hitcher' ? await Hitcher.findByIdAndUpdate({_id: req.user._id}, {friends: user.friends}) : await Driver.findByIdAndUpdate({_id: req.user._id}, {friends: user.friends});
        const noti = (req.user.type == 'Hitcher') ? new DriverNoti({recipient: client._id, sender: req.user._id, type: 'Friend'}) : new HitcherNoti({recipient: client._id, sender: req.user._id, type: 'Friend'});
        await noti.save();
        res.send('success');
    } catch (err) {
        return res.status(422).send({error: 'Could not add friend'});
    }
});

module.exports = router;


