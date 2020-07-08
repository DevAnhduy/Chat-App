const mongoose = require('mongoose');
const moment = require('moment');

const file_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver :{ 
        room_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
        },
        receiver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    url : {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        required: true
    },
    sent_date: {
        type: String,
        default : moment().format()
    }
})

module.exports = mongoose.model("File",file_schema);