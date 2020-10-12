const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AppError = require('src/utils/app_error');
const moment = require('moment');

const user_schema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "/images/user_default_avatar.jpg"
    },
    create_at: {
        type: Date,
        default: moment().format('YYYY-MM-DD')
    },
    friends : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    friends_request : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    friends_block : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    list_chats : [
        {
            type : {
                type : String,
                enum: ['rooms','users'],
                required: true
            },
            _id : {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        }
    ]
})

//Encryption password for user
user_schema.pre('save', async function(next) {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

user_schema.methods.correct_password = async function(candiate_password,user_password){
    return await bcrypt.compare(candiate_password,user_password)
}

module.exports = mongoose.model("User",user_schema);