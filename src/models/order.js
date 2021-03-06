const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: {
        type: Array
    },
    discount: {
        type: Number
    },
    paied_amount: {
        type: Number
    },
    price:{
        type: Number
    },
    buy_price:{
        type: Number
    },
    updated_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    business_id: {
        type: String,
        required: true
    },
    business: {
        type: Object,
        required: true
    },
    client_id: {
        type: String,
        required: true
    },
    client:{
        type: Object,
        required: true
    },
    comment: {
        type: String
    },
    status: {
        type: String,
        default: "active"
    },
    gift: {
        type: Array,
        required: true,
        default: []
    },
    is_debt: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
