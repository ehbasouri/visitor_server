const {Joi} = require("express-validation");

const mobile_regex = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/

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
        email : Joi.string().email().allow("", null),
        name : Joi.string(),
        address: Joi.string(),
        phone: Joi.string().allow("", null),
        mobile: Joi.string().regex(mobile_regex),
        avatar: Joi.string(),
        role: Joi.string(),
        sign_url: Joi.string(),
        is_active: Joi.boolean()
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
        sign_url: Joi.string(),
        is_active: Joi.boolean()
    })
}

module.exports = {
    businessSchema,
    businessLoginSchema,
    getBusinesssSchema,
    putBusinessSchema
}