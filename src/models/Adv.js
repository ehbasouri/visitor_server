const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sub_title: {
        type: String,
        require: true,
    },
    business_id: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
