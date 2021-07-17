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
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at"  } });

// UserSchema.index({name: 'text', username: "text"});

UserSchema.index({name: 'text'});

const User = mongoose.model('User', UserSchema);

module.exports = User;
