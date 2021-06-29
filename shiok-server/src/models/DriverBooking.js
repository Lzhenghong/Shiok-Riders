const mongoose = require('mongoose');

const driverBookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hitcher'
    },
    offer: {
        origin: String,
        dest: String,
        price: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    },
    rated: {
        type: Boolean,
        default: false
    }
});

mongoose.model('DriverBooking', driverBookingSchema);