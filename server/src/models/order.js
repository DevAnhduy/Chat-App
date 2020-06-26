const mongoose = require('mongoose');

const order_schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    }
})

module.exports = mongoose.model('Order',order_schema);