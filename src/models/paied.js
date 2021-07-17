const mongoose = require('mongoose');

const PaiedSchema = new mongoose.Schema({
    amount: {
        type: Number,
        require: true,
        dfault: 0
    },
    business_id: {
        type: String,
        required: true
    },
    client_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String
    },
    is_debt:{
        type: Boolean,
        require: true,
        default: false
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

const Paied = mongoose.model('paied', PaiedSchema);

module.exports = Paied;
