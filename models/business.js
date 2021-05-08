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

const Business = mongoose.model('business', BusinessSchema);

module.exports = Business;
