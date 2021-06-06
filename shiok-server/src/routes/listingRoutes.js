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

router.get('/listing', async (req, res) => {
    const {origin, dest} = req.body;
    const lister = req.user;
    try {
        if (lister.type == 'Driver') { 
            const result = await HitcherListing.find({
                origin: {
                    $near: {
                        $maxDistance: 5000,
                        $geometry: {
                            type: 'Point',
                            coordinates: [origin.longitude, origin.latitude]
                        }
                    }
                },
                dest: {
                    $near: {
                        $maxDistance: 5000,
                        $geometry: {
                            type: 'Point',
                            coordinates: [dest.longitude, dest.latitude]
                        }
                    }
                }
            });
            res.send(result);
        } else {
            const result = await DriverListing.find({
                origin: {
                    $near: {
                        $maxDistance: 5000,
                        $geometry: {
                            type: 'Point',
                            coordinates: [origin.longitude, origin.latitude]
                        }
                    }
                },
                dest: {
                    $near: {
                        $maxDistance: 5000,
                        $geometry: {
                            type: 'Point',
                            coordinates: [dest.longitude, dest.latitude]
                        }
                    }
                }
            });
            res.send(result);
        }
    } catch (err) {
        const body = req.body;
        res.send(body);
    }
});

module.exports = router;


/*const {dest} = req.body;
const lister = req.user;
try {
    if (lister.type == 'Driver') {
        const result = await HitcherListing.find({
            dest: {
                $near: {
                    $maxDistance: 5000,
                    $geometry: {
                        type: 'Point',
                        coordinates: [dest.longitude, dest.latitude]
                    }
                }
            }
        });
        res.send(result);
    } else {
        const result = await DriverListing.find({
            dest: {
                $near: {
                    $maxDistance: 5000,
                    $geometry: {
                        type: 'Point',
                        coordinates: [dest.longitude, dest.latitude]
                    }
                }
            }
        });
        res.send(result);
    }
}*/