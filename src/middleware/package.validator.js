const {Joi} = require("express-validation");

const packageSchema = {
    body: Joi.object({
        comment: Joi.string(),
        products : Joi.array(),
        price: Joi.number().required(),
        discount:Joi.number().required(),
        business_id: Joi.string().required(),
        buy_price: Joi.number(),
        status: Joi.string(),
        name: Joi.string(),
        gift: Joi.array(),
        business: Joi.object()
    }),
}

const getBusinessPackageSchema = {
    query: Joi.object({
        created_at: Joi.date(),
        business_id: Joi.string().required(),
        page : Joi.string(),
        limit: Joi.string(),
        _id: Joi.string(),
        status: Joi.string(),
        fromDate: Joi.date(),
        name: Joi.string(),
        toDate: Joi.date()
    })
}

const getClientPackageSchema = {
    query: Joi.object({
        created_at: Joi.date(),
        business_id: Joi.string(),
        name: Joi.string(),
        page : Joi.string(),
        limit: Joi.string(),
        _id: Joi.string(),
        status: Joi.string(),
        fromDate: Joi.date(),
        toDate: Joi.date()
    })
}

const putPackageSchema = {
    body: Joi.object({
        products : Joi.array(),
        price: Joi.number(),
        discount:Joi.number(),
        comment: Joi.string(),
        status: Joi.string(),
        buy_price: Joi.number(),
        gift: Joi.array(),
        name: Joi.string()
    }),
    query: Joi.object({
        id : Joi.string().required() 
    })
}


const deletePackageSchema = {
    query: Joi.object({
        id : Joi.string().required()
    }),
}

module.exports = {
    packageSchema,
    getBusinessPackageSchema,
    getClientPackageSchema,
    putPackageSchema,
    deletePackageSchema
}


