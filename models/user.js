const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        trype: String
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

const User = mongoose.model('user', UserSchema);

module.exports = User;
