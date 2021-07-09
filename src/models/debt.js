const mongoose = require('mongoose');

const DebtSchema = new mongoose.Schema({
    orders: {
        type: Array
    },
    amount: {
        type: Number,
        require: true
    },
    business_id: {
        type: String,
        required: true
    },
    client_id: {
        type: String,
        required: true
    },
    client: {
        type: Object,
        required: true
    },
    business: {
        type: Object,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

const Debt = mongoose.model('debt', DebtSchema);

module.exports = Debt;
