const queries = require("../queries/query")
const Cbr = require("../models/cbr");

const cbrQueries = Object.create(queries);
cbrQueries.Model = Cbr;

async function inserCbrController(req, res, next) {
    try {
        const cbr = await cbrQueries.insertQuery({...req.body, business_id : req.user._id});
        return res.status(200).json(cbr)
    } catch (error) {
        next(error)
    }    
}

async function getCbrController(req, res, next) {
    try {
        const cbr = await cbrQueries.getQuery(req.query);
        return res.status(200).json(cbr)
    } catch (error) {
        next(error);
    }
}

async function deleteCbrController(req, res, next) {
    try {
        const result = await cbrQueries.deleteQuery({_id: req.query.id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function putCbrController(req, res, next) {
    try {
        const result = await cbrQueries.putQuery(req.query.id, { ...req.body});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    inserCbrController,
    getCbrController,
    deleteCbrController,
    putCbrController
}

