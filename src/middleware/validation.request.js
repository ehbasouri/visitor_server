const { check, validationResult } = require('express-validator/check');
const Joi = require('joi');

const checkProduct = [
    check('name').isLength({ min: 3 }),
    check('cat1').exists(),
    check('cat2').exists(),
    check('cat3').exists(),
    check('cat4').exists(),
    check('price').isNumeric()
]

function productValidator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        return next()
    }
}

const productToPostValidator = {
    body: {
        productID: Joi.string().required().length(24),
        comment: Joi.boolean().default(true),
        caption: Joi.string(),
        cats: Joi.array().min(1).required(),
    }
}


const productSchema = {
    name: Joi.string().required(),
    cat1: Joi.string().required(),
    cat2: Joi.string().required(),
    cat3: Joi.string().required(),
    cat4: Joi.string().required(),
    price: Joi.number().required()
}

module.exports = {
    productValidator,
    productToPostValidator,
    checkProduct,
    productSchema
};