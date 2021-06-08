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
    business_id: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at' } });

ProductsSchema.index({name: 'text'});

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;
