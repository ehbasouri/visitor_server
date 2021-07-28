const {Joi} = require("express-validation");

const categorySchema = {
    body: Joi.object({
        name : Joi.string().required(),
        parId : Joi.string().required(),
        edge : Joi.boolean().required(),
        is_private: Joi.boolean()
    }),
}

const getCategorySchema = {
    query: Joi.object({
        parId : Joi.string(),
        _id : Joi.string(),
        business_id: Joi.string().required(),
        name : Joi.string(),
        edge : Joi.boolean(),
        page : Joi.string(),
        limit: Joi.string(),
        is_private: Joi.boolean()
    })
}

const getBusinessCategorySchema = {
    query: Joi.object({
        parId : Joi.string(),
        _id : Joi.string(),
        name : Joi.string(),
        edge : Joi.boolean(),
        page : Joi.string(),
        limit: Joi.string(),
        is_private: Joi.boolean()
    })
}

const deleteCategorySchema = {
    query: Joi.object({
        catId : Joi.string().required()
    }),
}

const putCategorySchema = {
    body: Joi.object({
        name : Joi.string().required(),
        edge : Joi.boolean().required(),
        is_private: Joi.boolean()
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


