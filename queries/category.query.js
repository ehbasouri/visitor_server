const Category = require('../models/category');

function insertCategoryQuery(data) {
    const newCategory = new Category(data);
    return newCategory.save()
}

function getCategorysQuery(data) {
    return Category.find(data)
}

function deleteCategorysQuery(data) {
    return Category.findOneAndDelete(data)
}

function putCategoriesQuery(_id, data) {
    return Category.findOneAndUpdate({_id}, data)
}

module.exports = {
    insertCategoryQuery,
    getCategorysQuery,
    deleteCategorysQuery,
    putCategoriesQuery
}
