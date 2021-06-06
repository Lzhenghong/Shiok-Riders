const mongoose = require('mongoose');

/*const driverListingSchema = new mongoose.Schema({
    lister: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
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

const driverListingSchema = new mongoose.Schema({
    lister: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
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

driverListingSchema.index({origin: '2dsphere', dest: '2dsphere'});

mongoose.model('DriverListing', driverListingSchema);