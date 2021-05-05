const Product = require('../models/products');

function getProductByIdQuery(_id) {
    return Product.findById(_id)
}

module.exports = getProductByIdQuery