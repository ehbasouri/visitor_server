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
        parId : Joi.string().required()
    }),
}

const deleteCategorySchema = {
    query: Joi.object({
        catId : Joi.string().required()
    }),
}

const putCategorySchema = {
    body: Joi.object({
        name : Joi.string().required(),
        parId : Joi.string().required(),
        edge : Joi.boolean().required()
    }),
    query: Joi.object({
        catId : Joi.string().required()
    })
}

module.exports = {
    categorySchema,
    getCategorySchema,
    deleteCategorySchema,
    putCategorySchema
}


