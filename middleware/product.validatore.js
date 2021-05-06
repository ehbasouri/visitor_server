const {Joi} = require("express-validation");

const productSchema = {
    body: Joi.object({
        name : Joi.string().required(),
        price: Joi.number().required(),
        buy_price:Joi.number().required(),
        cat_id: Joi.string().required(),
        store_id: Joi.string().required(),
        count: Joi.number().required(),
        description: Joi.string(),
        image: Joi.string()
    }),
}

const getProductSchema = {
    query: Joi.object({
        page : Joi.string(),
        limit: Joi.string()
    })
}

const deleteProductSchema = {
    query: Joi.object({
        id : Joi.string().required()
    }),
}

const putProductSchema = {
    body: Joi.object({
        name : Joi.string().required(),
        price: Joi.number().required(),
        buy_price:Joi.number().required(),
        cat_id: Joi.string().required(),
        store_id: Joi.string().required(),
        count: Joi.number().required(),
        description: Joi.string(),
        image: Joi.string()
    }),
    query: Joi.object({
        id : Joi.string().required()
    })
}

module.exports = {
    productSchema,
    getProductSchema,
    deleteProductSchema,
    putProductSchema
}


