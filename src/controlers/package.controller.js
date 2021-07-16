const queries = require("../queries/query")
const Package = require("../models/package");

const packageQueries = Object.create(queries);
packageQueries.Model = Package;

async function insertPackageController(req, res, next) {
    try {
        const order = await packageQueries.insertQuery({...req.body});
        return res.status(200).json(order)
    } catch (error) {
        next(error)
    }    
}

async function getPackageController(req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    delete req.query.fromDate
    delete req.query.toDate
    try {
        const order = await packageQueries.getQuery(req.query, req.query.page, req.query.limit, null, fromDate, toDate);
        return res.status(200).json(order)
    } catch (error) {
        next(error);
    }
}

async function putPackageController(req, res, next) {
    try {
        const result = await packageQueries.putQuery(req.query.id, { ...req.body});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function deletPackageController(req, res, next) {
    try {
        const result = await packageQueries.deleteQuery({_id: req.query.id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
} 


module.exports = {
    insertPackageController,
    getPackageController,
    putPackageController,
    deletPackageController
}

