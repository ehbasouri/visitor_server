const {Joi} = require("express-validation");

const orderSchema = {
    body: Joi.object({
        comment: Joi.string(),
        products : Joi.array(),
        price: Joi.number().required(),
        discount:Joi.number().required(),
        business_id: Joi.string().required(),
        client_id: Joi.string().required(),
        business: Joi.object().required(),
        client: Joi.object().required(),
        buy_price: Joi.number(),
        status: Joi.string()
    }),
}

const getBusinessOrderSchema = {
    query: Joi.object({
        created_at: Joi.date(),
        business_id: Joi.string().required(),
        client_id: Joi.string(),
        page : Joi.string(),
        limit: Joi.string(),
        _id: Joi.string(),
        status: Joi.string()
    })
}

const getClientOrderSchema = {
    query: Joi.object({
        created_at: Joi.date(),
        business_id: Joi.string(),
        client_id: Joi.string().required(),
        page : Joi.string(),
        limit: Joi.string(),
        _id: Joi.string(),
        status: Joi.string()
    })
}

const putOrderSchema = {
    body: Joi.object({
        products : Joi.array(),
        price: Joi.number(),
        discount:Joi.number(),
        comment: Joi.string(),
        status: Joi.string(),
        buy_price: Joi.number()
    }),
    query: Joi.object({
        id : Joi.string().required()
    })
}

module.exports = {
    orderSchema,
    getBusinessOrderSchema,
    getClientOrderSchema,
    putOrderSchema
}


