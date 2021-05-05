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
        trype: String,
        required: true     
    },
    store_id: {
        trype: String,
        required: true   
    },
    count: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
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
