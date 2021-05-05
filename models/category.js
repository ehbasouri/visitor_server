const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    parId: {
        type: String
    },
    edge: {
        type: Boolean
    },
    user_id: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
