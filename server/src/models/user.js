const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AppError = require('src/utils/app_error');
const moment = require('moment');

const user_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    avatar: String,
    create_at: {
        type: Date,
        default: moment().format('YYYY-MM-DD')
    },
    last_online: {
        type: Date,
        default: moment().format('YYYY-MM-DD')
    },
    last_message_at: Date
})

//Encryption password for user
user_schema.pre('save', async function(next) {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("User",user_schema);