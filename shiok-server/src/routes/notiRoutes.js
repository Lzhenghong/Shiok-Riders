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

router.post('/sendoffer', async(req, res) => {
    const {recipient, type, listing, offer} = req.body;
    const exist = (req.user.type == 'Hitcher') ? await DriverListing.findById({_id: listing._id}) : await HitcherListing.findById({_id: listing._id});
    if (!exist) {
        return res.status(422).send({ error: 'Unable to find listing' });
    }
    const submitted = (req.user.type == 'Hitcher') ? await DriverNoti.find({sender: req.user._id, listing: listing._id}) : await HitcherNoti.find({sender: req.user._id, listing: listing._id});
    if (submitted.length > 0) {
        return res.status(422).send({error: 'Already submitted an offer'});
    }
    try {
        const noti = (req.user.type == 'Hitcher') ? new DriverNoti({recipient: recipient._id, sender: req.user._id, type, listing: listing._id, offer}) : new HitcherNoti({recipient: recipient._id, sender: req.user._id, type, listing: listing._id, offer});
        await noti.save();
        res.send('success');
    } catch (err) {
        return res.status(422).send({ error: 'Could not send notification' });
    }
});

router.get('/bookingnoti', async(req, res) => {
    try {
        const docs = req.user.type == 'Driver' ? 
            await DriverNoti.find({recipient: req.user._id, $or: [{type: 'Offer'}, {type: 'Accept'}, {type: 'Reject'}]}).populate('sender') : 
            await HitcherNoti.find({recipient: req.user._id, $or: [{type: 'Offer'}, {type: 'Accept'}, {type: 'Reject'}]}).populate('sender');
        const promises = docs.map(async (doc) => {
            const listing = (req.user.type == 'Driver') ? await DriverListing.findById({_id: doc.listing}) : await HitcherListing.findById({_id: doc.listing});
            const expire = listing ? {expired: false} : {expired: true};
            return Object.assign({}, doc._doc, expire);
        });
        Promise.all(promises).then(result => {
            res.send(result);
        });        
    } catch {
        return res.status(422).send({ error: 'Could not fetch notifications' });
    }
});

router.post('/sendresult', async(req, res) => {
    const {result, item} = req.body;
    const exist = (req.user.type == 'Driver') ? await DriverListing.findById({_id: item.listing}) : await HitcherListing.find({_id: item.listing});
    try {
        if (result == 'Accept' && exist) {
            req.user.type == 'Driver' ? await DriverListing.findByIdAndDelete({_id: item.listing}) : await HitcherListing.findByIdAndDelete({_id: item.listing});
        }
        const noti = (req.user.type == 'Driver') ? 
            new HitcherNoti({recipient: item.sender._id, sender: req.user._id, type: result, listing: item.listing, offer: item.offer}) : 
            new DriverNoti({recipient: item.sender._id, sender: req.user._id, type: result, listing: item.listing, offer: item.offer});
        await noti.save();
        req.user.type == 'Driver' ? await DriverNoti.findByIdAndDelete({_id: item._id}) : await HitcherNoti.findByIdAndDelete({_id: item._id});
        res.send('success');
    } catch (err) {
        return res.status(422).send({error: 'Could not accept/reject'});
    }
});

router.post('/deletenoti', async(req, res) => {
    const {item} = req.body;
    try {
        req.user.type == 'Hitcher' ? await HitcherNoti.findByIdAndDelete({_id: item._id}) : await DriverNoti.findByIdAndDelete({_id: item._id});
        res.send('success');
    } catch (err) {
        return res.status(422).send({error: 'Could not delete notification'});
    }
});

module.exports = router;


