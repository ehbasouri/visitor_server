const mongoose = require('mongoose');
/**
 * cbr means "Client Business Relation"
 */
const CbrSchema = new mongoose.Schema({
    show_price: {
        type: Boolean,
        required: true,
        default: false
    },
    show_private_products: {
        type: Boolean,
        required: true,
        default: false
    },
    business_id: {
        type: String,
        required: true
    },
    client_id: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

const Cbr = mongoose.model('cbr', CbrSchema);

module.exports = Cbr;
