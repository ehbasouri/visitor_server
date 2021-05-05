const Product = require('../models/products');

function deleteProductQuery(_id) {
    return Product.deleteOne({_id})
}

module.exports = deleteProductQuery;