const queries = require("../queries/query")
const Product = require("../models/products");

const productQueries = Object.create(queries);
productQueries.Model = Product;

async function inserProductController(req, res, next) {
    try {
        const product = await productQueries.insertQuery({...req.body, user_id : req.user.id});
        return res.status(200).json(product)
    } catch (error) {
        next(error)
    }    
}

async function getProductController(req, res, next) {
    try {
        const product = await productQueries.getQuery({ user_id: req.user.id, ...req.query}, req.query.page, req.query.limit);
        return res.status(200).json(product)
    } catch (error) {
        next(error);
    }
}

async function deleteProductController(req, res, next) {
    try {
        const result = await productQueries.deleteQuery({_id: req.query.id, user_id: req.user.id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function putProductController(req, res, next) {
    try {
        const result = await productQueries.putQuery(req.query.id, { ...req.body, user_id: req.user.id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    inserProductController,
    getProductController,
    deleteProductController,
    putProductController
}

