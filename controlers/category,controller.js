const { insertCategoryQuery, getCategorysQuery, putCategoriesQuery, deleteCategorysQuery } = require("../queries/category.query")

async function inserCategoryController(req, res, next) {
    try {
        const category = await insertCategoryQuery({...req.body, user_id : req.user.id});
        return res.status(200).json(category)
    } catch (error) {
        next(error)
    }    
}

async function getCategoriesController(req, res, next) {
    try {
        const category = await getCategorysQuery({parId: req.query.parId, user_id: req.user.id});
        return res.status(200).json(category)
    } catch (error) {
        next(error);
    }
}

async function deleteCategoriesController(req, res, next) {
    try {
        const result = await deleteCategorysQuery({_id: req.query.catId, user_id: req.user.id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function putCategoriesController(req, res, next) {
    try {
        const result = await putCategoriesQuery(req.query.catId, { ...req.body, user_id: req.user.id});
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

