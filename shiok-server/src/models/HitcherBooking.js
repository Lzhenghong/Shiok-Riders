const mongoose = require('mongoose');

const hitcherBookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hitcher'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
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

mongoose.model('HitcherBooking', hitcherBookingSchema);