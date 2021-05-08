const {Joi} = require("express-validation");

const userSchema = {
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
        role: Joi.string()
    }),
}

const putUserSchema = {
    body: Joi.object({
        email : Joi.string().email(),
        name : Joi.string(),
        address: Joi.string(),
        phone: Joi.string(),
        mobile: Joi.string(),
        avatar: Joi.string(),
        role: Joi.string()
    }),
}

const loginSchema = {
    body: Joi.object({
        username : Joi.string().required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required()
    }),
}

const getUsersSchema = {
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
        role: Joi.string()
    })
}

module.exports = {
    userSchema,
    loginSchema,
    getUsersSchema,
    putUserSchema
}