const mongoose = require('mongoose');
/**
 * cbr means "Client Business Relation"
 */
const FcmTokenSchema = new mongoose.Schema({
    fcm_token: {
        type: Array
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

const FcmToken = mongoose.model('fcmToken', FcmTokenSchema);

module.exports = FcmToken;
