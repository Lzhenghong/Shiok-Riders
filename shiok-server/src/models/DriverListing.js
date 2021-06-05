const mongoose = require('mongoose');

const driverListingSchema = new mongoose.Schema({
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
            // auto expire after 6 hours
            expires: 21600 
        }
    }
});

mongoose.model('DriverListing', driverListingSchema);