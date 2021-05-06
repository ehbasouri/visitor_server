const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    buy_price: {
        type: Number,
        required: true,
        default: 0
    },
    cat_id: {
        type: String,
        required: true     
    },
    store_id: {
        type: String,
        required: true   
    },
    count: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    updated_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    user_id: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
});

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;
