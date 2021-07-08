const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    business_id: { 
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at"  } });

const Store = mongoose.model('store', StoreSchema);

module.exports = Store;
