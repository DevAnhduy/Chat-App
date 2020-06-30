const mongoose = require('mongoose');

const message_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    room_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Chat Room'
    } ,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sent_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message',message_schema);