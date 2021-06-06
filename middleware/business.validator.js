const {Joi} = require("express-validation");

const businessSchema = {
    body: Joi.object({
        username : Joi.string().required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
        email : Joi.string().email(),
        name : Joi.string().required(),
        address: Joi.string(),
        phone: Joi.string(),
        mobile: Joi.string(),
        avatar: Joi.string(),
        role: Joi.string(),
        sign_url: Joi.string()
    }),
}

const putBusinessSchema = {
    body: Joi.object({
        email : Joi.string().email(),
        name : Joi.string(),
        address: Joi.string(),
        phone: Joi.string(),
        mobile: Joi.string(),
        avatar: Joi.string(),
        role: Joi.string(),
        sign_url: Joi.string()
    }),
}

const businessLoginSchema = {
    body: Joi.object({
        username : Joi.string().required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required()
    }),
}

const getBusinesssSchema = {
    query: Joi.object({
        page : Joi.string(),
        limit: Joi.string(),

        username : Joi.string(),
        email : Joi.string().email(),
        name : Joi.string(),
        address: Joi.string(),
        phone: Joi.string(),
        mobile: Joi.string(),
        avatar: Joi.string(),
        role: Joi.string(),
        sign_url: Joi.string()
    })
}

module.exports = {
    businessSchema,
    businessLoginSchema,
    getBusinesssSchema,
    putBusinessSchema
}