const mongoose = require('mongoose');
const moment = require('moment')

const room_schema = new mongoose.Schema({
    avatar: String,
    name : String,
    admin : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    create_at: {
        type: Date,
        default: moment().format('YYYY-MM-DD')
    },
    last_message_at: Date
})

module.exports = mongoose.model('Chat Room',room_schema);