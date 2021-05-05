const Joi = require('joi');

module.exports = {
    body: {
        name : Joi.string().required(),
        cat1 : Joi.string().required(),
        cat2 : Joi.string().required(),
        cat3 : Joi.string().required(),
        cat4 : Joi.string().required(),
        price : Joi.number().required()
    }
};
