const queries = require("../queries/query")
const Order = require("../models/order");

const orderQueries = Object.create(queries);
orderQueries.Model = Order;

async function inserOrderController(req, res, next) {
    try {
        const order = await orderQueries.insertQuery({...req.body});
        return res.status(200).json(order)
    } catch (error) {
        next(error)
    }    
}

async function getOrderController(req, res, next) {
    try {
        const order = await orderQueries.getQuery(req.query, req.query.page, req.query.limit);
        return res.status(200).json(order)
    } catch (error) {
        next(error);
    }
}

async function putOrderController(req, res, next) {
    try {
        const result = await orderQueries.putQuery(req.query.id, { ...req.body});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    inserOrderController,
    getOrderController,
    putOrderController
}

