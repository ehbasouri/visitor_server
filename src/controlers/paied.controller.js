const queries = require("../queries/query")
const Paied = require("../models/paied");

const paiedQueries = Object.create(queries);
paiedQueries.Model = Paied;

async function inserPaiedController(req, res, next) {
    try {
        const debt = await paiedQueries.insertQuery({...req.body});
        return res.status(200).json(debt)
    } catch (error) {
        next(error)
    }    
}

async function getPaiedController(req, res, next) {
    try {
        const debt = await paiedQueries.getQuery(req.query);
        return res.status(200).json(debt)
    } catch (error) {
        next(error);
    }
}

async function deletePaiedController(req, res, next) {
    try {
        const result = await paiedQueries.deleteQuery({_id: req.query.id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function putPaiedController(req, res, next) {
    try {
        const result = await paiedQueries.putQuery(req.query.id, { ...req.body});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}



module.exports = {
    inserPaiedController,
    getPaiedController,
    deletePaiedController,
    putPaiedController
}

