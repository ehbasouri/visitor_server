const {Joi} = require("express-validation");

const paiedSchema = {
    body: Joi.object({
        amount: Joi.number(),
        business_id: Joi.string(),
        client_id: Joi.string(),
        order_id: Joi.string(),
        is_debt: Joi.boolean()
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
        is_debt: Joi.boolean()
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


