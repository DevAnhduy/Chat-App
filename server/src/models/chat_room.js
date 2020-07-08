const mongoose = require('mongoose');

const room_schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
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
    ]
})

module.exports = mongoose.model('Chat Room',room_schema);