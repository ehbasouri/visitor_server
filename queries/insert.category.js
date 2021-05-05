const Category = require('../models/category');

function insertCategory(data) {
    const newCategory = new Category(data);
    return newCategory.save()
}

module.exports = insertCategory