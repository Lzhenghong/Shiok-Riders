const mongoose = require('mongoose');

const driverNotiSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hitcher'
    },
    type: {
        type: String 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DriverListing'
    },
    offer: {
        origin: String,
        dest: String,
        price: String
    }
});

mongoose.model('driverNoti', driverNotiSchema);