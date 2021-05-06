const queries = require("../queries/query")
const Category = require("../models/category");

const categoryQueries = Object.create(queries);
categoryQueries.Model = Category;

async function inserCategoryController(req, res, next) {
    try {
        const category = await categoryQueries.insertQuery({...req.body, user_id : req.user.id});
        return res.status(200).json(category)
    } catch (error) {
        next(error)
    }    
}

async function getCategoriesController(req, res, next) {
    try {
        const category = await categoryQueries.getQuery({parId: req.query.parId, user_id: req.user.id}, req.query.page, req.query.limit);
        return res.status(200).json(category)
    } catch (error) {
        next(error);
    }
}

async function deleteCategoriesController(req, res, next) {
    try {
        const result = await categoryQueries.deleteQuery({_id: req.query.catId, user_id: req.user.id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function putCategoriesController(req, res, next) {
    try {
        const result = await categoryQueries.putQuery(req.query.catId, { ...req.body, user_id: req.user.id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    inserCategoryController,
    getCategoriesController,
    deleteCategoriesController,
    putCategoriesController
}

