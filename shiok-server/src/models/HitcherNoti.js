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
    }
});

mongoose.model('hitcherNoti', hitcherNotiSchema);