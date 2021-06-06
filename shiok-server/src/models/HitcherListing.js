const mongoose = require('mongoose');

/*const hitcherListingSchema = new mongoose.Schema({
    lister: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hitcher'
    },
    origin: {
        name: String,
        latitude: Number,
        longitude: Number
    },
    dest: {
        name: String,
        latitude: Number,
        longitude: Number
    },
    price: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {
            // auto expire after 30 min
            expires: 1800 
        }
    }
});*/

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
        coordinates: []
    },
    dest: {
        name: String,
        type: {
            type: String
        },
        coordinates: []
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

hitcherListingSchema.index({origin: '2dsphere', dest: '2dsphere'});

mongoose.model('HitcherListing', hitcherListingSchema);