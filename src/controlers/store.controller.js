const queries = require("../queries/query")
const Store = require("../models/store");

const storeQueries = Object.create(queries);
storeQueries.Model = Store;

async function inserStoreController(req, res, next) {
    try {
        const store = await storeQueries.insertQuery({...req.body, business_id : req.user._id});
        return res.status(200).json(store)
    } catch (error) {
        next(error)
    }    
}

async function getStoreController(req, res, next) {
    try {
        const store = await storeQueries.getQuery({ business_id: req.user._id}, req.query.page, req.query.limit);
        return res.status(200).json(store)
    } catch (error) {
        next(error);
    }
}

async function deleteStoreController(req, res, next) {
    try {
        const result = await storeQueries.deleteQuery({_id: req.query.id, business_id: req.user._id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function putStoreController(req, res, next) {
    try {
        const result = await storeQueries.putQuery(req.query.id, { ...req.body, business_id: req.user._id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    inserStoreController,
    getStoreController,
    deleteStoreController,
    putStoreController
}

