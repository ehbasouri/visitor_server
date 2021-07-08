const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: "admin"
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    mobile: {
        type: String
    },
    avatar: {
        type: String
    },
    sign_url: {
        type: String
    },
    is_active : {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

const Business = mongoose.model('business', BusinessSchema);

module.exports = Business;
