const {Joi} = require("express-validation");




const debtSchema = {
    body: Joi.object({
        amount: Joi.number(),
        business_id: Joi.string(),
        client_id: Joi.string(),
        client: Joi.object(),
        business: Joi.object(),
        paied_amount: Joi.number()
    }), 
}

const getDebtSchema = {
    query: Joi.object({
        business_id: Joi.string(),
        client_id: Joi.string(),
    })
}

const deleteDebtSchema = {
    query: Joi.object({
        id : Joi.string().required()
    }),
}

const putDebtSchema = {
    body: Joi.object({
        amount: Joi.number(),
        paied_amount: Joi.number()
    }),
    query: Joi.object({
        id : Joi.string().required()
    })
}

module.exports = {
    debtSchema,
    getDebtSchema,
    deleteDebtSchema,
    putDebtSchema
}


