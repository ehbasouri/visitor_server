const mongoose = require('mongoose');

const DebtSchema = new mongoose.Schema({
    amount: {
        type: Number,
        require: true,
        dfault: 0
    },
    paied_amount: {
        type: Number,
        require: true,
        default: 0
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
