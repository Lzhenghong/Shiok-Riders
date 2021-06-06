const mongoose = require('mongoose');

const hitcherListingSchema = new mongoose.Schema({
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
});

mongoose.model('HitcherListing', hitcherListingSchema);