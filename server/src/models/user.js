const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AppError = require('src/utils/app_error');

const user_schema = new mongoose.Schema({
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

//Encryption password for user
user_schema.pre('save', async function(next) {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("User",user_schema);