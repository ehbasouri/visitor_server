const Product = require('../models/products');
const utils = require('../src/utils');

function updateProductQuery(_id, product) {
    product.tags = utils.createTag(product)
    product.updated_at = new Date()
    return Product.updateOne({ _id }, product)
}

module.exports = updateProductQuery;