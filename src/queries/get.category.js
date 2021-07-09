const Category = require('../models/category');

function getCategorys(parId) {
    return Category.find({ parId })
}

module.exports = getCategorys