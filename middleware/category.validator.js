const {Joi} = require("express-validation");

const categorySchema = {
    body: Joi.object({
        name : Joi.string().required(),
        parId : Joi.string().required(),
        edge : Joi.boolean().required()
    }),
}

const getCategorySchema = {
    query: Joi.object({
        parId : Joi.string().required(),
        business_id: Joi.string().required(),
        name : Joi.string(),
        edge : Joi.boolean(),
        page : Joi.string(),
        limit: Joi.string()
    })
}

const getBusinessCategorySchema = {
    query: Joi.object({
        parId : Joi.string().required(),
        name : Joi.string(),
        edge : Joi.boolean(),
        page : Joi.string(),
        limit: Joi.string()
    })
}

const deleteCategorySchema = {
    query: Joi.object({
        catId : Joi.string().required()
    }),
}

const putCategorySchema = {
    body: Joi.object({
        name : Joi.string().required()
    }),
    query: Joi.object({
        catId : Joi.string().required()
    })
}

module.exports = {
    categorySchema,
    getCategorySchema,
    deleteCategorySchema,
    putCategorySchema,
    getBusinessCategorySchema
}


