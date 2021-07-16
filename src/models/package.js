const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
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
    buy_price:{
        type: Number
    },
    business: {
        type: Object,
        required: true
    },
    business_id: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    gift: {
        type: Array
    },
    status: {
        type: String,
        default: "active"
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

const Package = mongoose.model('package', PackageSchema);

module.exports = Package;
