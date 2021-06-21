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

router.post('/hitcherlisting', async (req, res) => {
    const {origin, dest, price} = req.body;
    const hashMap = new Map();
    const result = [];
    try {
        const firstResult = await HitcherListing.find({
            origin: {
                $near: {
                    $maxDistance: 5000,
                    $geometry: {
                        type: 'Point',
                        coordinates: [origin.longitude, origin.latitude]
                    }
                }
            },
            price: {
                $gte: price
            }
        }).populate('lister');
        firstResult.map(doc => hashMap.set(doc._id.toString(), doc));
        const secondResult = await HitcherListing.find({
            dest: {
                $near: {
                    $maxDistance: 5000,
                    $geometry: {
                        type: 'Point',
                        coordinates: [dest.longitude, dest.latitude]
                    }
                }
            },
            price: {
                $gte: price
            }
        }).populate('lister');
        secondResult.map(doc => {
            if (hashMap.has(doc._id.toString())) {
                result.push(doc);
            }
        });
        res.send(result);
    } catch (err) {
        return res.status(422).send({ error: 'Failed to fetch listing' });
    }
});

router.post('/driverlisting', async (req, res) => {
    const {origin, dest, price} = req.body;
    const hashMap = new Map();
    const result = [];
    console.log({origin, dest, price});
    try {
        const firstResult = await DriverListing.find({
            origin: {
                $near: {
                    $maxDistance: 5000,
                    $geometry: {
                        type: 'Point',
                        coordinates: [origin.longitude, origin.latitude]
                    }
                }
            },
            price: {
                $lte: price
            }
        }).populate('lister');
        firstResult.map(doc => hashMap.set(doc._id.toString(), doc));
        const secondResult = await DriverListing.find({
            dest: {
                $near: {
                    $maxDistance: 5000,
                    $geometry: {
                        type: 'Point',
                        coordinates: [dest.longitude, dest.latitude]
                    }
                }
            },
            price: {
                $lte: price
            }
        }).populate('lister');
        secondResult.map(doc => {
            if (hashMap.has(doc._id.toString())) {
                result.push(doc);
            }
        });
        console.log(firstResult);
        console.log(secondResult);
        res.send(result);
    } catch (err) {
        return res.status(422).send({ error: 'Failed to fetch listing' });
    }
});

module.exports = router;


