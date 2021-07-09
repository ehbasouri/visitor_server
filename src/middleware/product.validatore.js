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
        image: Joi.string(),
        is_private: Joi.boolean()
    }),
}

const getProductSchema = {
    query: Joi.object({
        business_id: Joi.string().required(),
        page : Joi.string(),
        limit: Joi.string(),

        name : Joi.string(),
        price: Joi.number(),
        buy_price:Joi.number(),
        cat_id: Joi.string(),
        store_id: Joi.string(),
        count: Joi.number(),
        description: Joi.string(),
        image: Joi.string(),
        is_private: Joi.boolean()
    })
}

const getBusinessProductSchema = {
    query: Joi.object({
        page : Joi.string(),
        limit: Joi.string(),

        name : Joi.string(),
        price: Joi.number(),
        buy_price:Joi.number(),
        cat_id: Joi.string(),
        store_id: Joi.string(),
        count: Joi.number(),
        description: Joi.string(),
        image: Joi.string(),
        _id: Joi.string(),
        is_private: Joi.boolean()
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
        image: Joi.string(),
        is_private: Joi.boolean()
    }),
    query: Joi.object({
        id : Joi.string().required()
    })
}

module.exports = {
    productSchema,
    getProductSchema,
    deleteProductSchema,
    putProductSchema,
    getBusinessProductSchema
}


