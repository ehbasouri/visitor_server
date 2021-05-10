const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: Object
    },
    products: {
        type: Array
    },
    discount: {
        type: Number
    },
    price:{
        type: Number
    },
    created_at: {
        type: Date,
        default: new Date(),
        required: true
    },
    updated_at: {
        type: Date,
        required: true,
        default: new Date()
    }
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
