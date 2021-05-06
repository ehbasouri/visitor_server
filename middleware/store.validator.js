const {Joi} = require("express-validation");

const storeSchema = {
    body: Joi.object({
        name : Joi.string().required()
    }),
}

const getStoreSchema = {
    query: Joi.object({
        page : Joi.string(),
        limit: Joi.string()
    })
}

const deleteStoreSchema = {
    query: Joi.object({
        id : Joi.string().required()
    }),
}

const putStoreSchema = {
    body: Joi.object({
        name : Joi.string().required(),
    }),
    query: Joi.object({
        id : Joi.string().required()
    })
}

module.exports = {
    storeSchema,
    getStoreSchema,
    deleteStoreSchema,
    putStoreSchema
}


