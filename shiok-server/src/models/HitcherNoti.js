const mongoose = require('mongoose');

const hitcherNotiSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hitcher'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    type: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HitcherListing'
    },
    offer: {
        origin: String,
        dest: String,
        price: String
    },
    read: {
        type: Boolean,
        default: false
    }
});

mongoose.model('hitcherNoti', hitcherNotiSchema);