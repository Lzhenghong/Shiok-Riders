const mongoose = require('mongoose');

const hitcherListingSchema = new mongoose.Schema({
    lister: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hitcher'
    },
    origin: {
        name: String,
        type: {
            type: String
        },
        coordinates: {
            type: [Number]
        }
    },
    dest: {
        name: String,
        type: {
            type: String
        },
        coordinates: {
            type: [Number]
        }
    },
    price: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {
            //  auto expires after 30 min
            expires: 1800
        }
    }
});

hitcherListingSchema.index({origin: '2dsphere'});
hitcherListingSchema.index({dest: '2dsphere'});

mongoose.model('HitcherListing', hitcherListingSchema);