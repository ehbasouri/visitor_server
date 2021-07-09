const {Joi} = require("express-validation");

const cbrSchema = {
    body: Joi.object({
        show_price: Joi.boolean() ,
        show_private_products: Joi.boolean(),
        client_id: Joi.string().required()
    }),
}

const getCbrSchema = {
    query: Joi.object({
        business_id: Joi.string().required(),
        client_id: Joi.string().required()
    })
}

const deleteCbrSchema = {
    query: Joi.object({
        id : Joi.string().required()
    }),
}

const putCbrSchema = {
    body: Joi.object({
        show_price: Joi.boolean() ,
        show_private_products: Joi.boolean(),
    }),
    query: Joi.object({
        id : Joi.string().required()
    })
}

module.exports = {
    cbrSchema,
    getCbrSchema,
    deleteCbrSchema,
    putCbrSchema
}


