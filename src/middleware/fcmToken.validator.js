const {Joi} = require("express-validation");

const fcmTokenSchema = {
    body: Joi.object({
        fcm_token: Joi.string().required()
    }),
}

const getFcmTokenSchema = {
    query: Joi.object({
        user_id: Joi.string().required()
    })
}

const deleteFcmTokenSchema = {
    query: Joi.object({
        fcm_token: Joi.string()
    }),
}

module.exports = {
    fcmTokenSchema,
    getFcmTokenSchema,
    deleteFcmTokenSchema
}


