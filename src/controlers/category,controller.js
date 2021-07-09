const queries = require("../queries/query")
const Category = require("../models/category");

const categoryQueries = Object.create(queries);
categoryQueries.Model = Category;

async function inserCategoryController(req, res, next) {
    try {
        const category = await categoryQueries.insertQuery({...req.body, business_id : req.user._id});
        return res.status(200).json(category)
    } catch (error) {
        next(error)
    }    
}

async function getCategoriesController(req, res, next) {
    try {
        const category = await categoryQueries.getQuery(req.query, req.query.page, req.query.limit);
        return res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}

async function getBusinessCategoriesController(req, res, next) {
    try {
        const category = await categoryQueries.getQuery({...req.query, business_id: req.user._id}, req.query.page, req.query.limit);
        return res.status(200).json(category)
    } catch (error) {
        next(error);
    }
}

async function deleteCategoriesController(req, res, next) {
    try {
        const result = await categoryQueries.deleteQuery({_id: req.query.catId, business_id: req.user._id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function putCategoriesController(req, res, next) {
    try {
        const result = await categoryQueries.putQuery(req.query.catId, { ...req.body, business_id: req.user._id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    inserCategoryController,
    getCategoriesController,
    deleteCategoriesController,
    putCategoriesController,
    getBusinessCategoriesController
}

