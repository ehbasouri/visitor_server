const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    parId: {
        type: String,
        require: true,
        default: "root"
    },
    edge: {
        type: Boolean
    },
    business_id: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
