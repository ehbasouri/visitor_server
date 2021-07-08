const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    buy_price: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    earn: {
        type: Number,
        require: true
    },
    business_id: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

const Analytics = mongoose.model('analytics', AnalyticsSchema);

module.exports = Analytics;
