const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    socket_id: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String
})

module.exports = mongoose.model("User",user_schema);