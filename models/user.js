const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        default: "member"
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
    },
    user_id: {
        type: String,
        require: true,
        default: "admin"
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
