const {Joi} = require("express-validation");

const paiedSchema = {
    body: Joi.object({
        amount: Joi.number(),
        business_id: Joi.string(),
        client_id: Joi.string(),
        description: Joi.string(),
        order_id: Joi.string(),
        is_debt: Joi.boolean(),
        client: Joi.object(),
        business: Joi.object()
    }), 
}

const getPaiedSchema = {
    query: Joi.object({
        business_id: Joi.string(),
        client_id: Joi.string(),
    })
}

const deletePaiedSchema = {
    query: Joi.object({
        id : Joi.string().required()
    }),
}

const putPaiedSchema = {
    body: Joi.object({
        amount: Joi.number(),
        order_id: Joi.string(),
        is_debt: Joi.boolean(),
        description: Joi.string(),
    }),
    query: Joi.object({
        id : Joi.string().required()
    })
}

module.exports = {
    paiedSchema,
    getPaiedSchema,
    deletePaiedSchema,
    putPaiedSchema
}


