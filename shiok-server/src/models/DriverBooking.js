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
    }
});

mongoose.model('DriverBooking', driverBookingSchema);