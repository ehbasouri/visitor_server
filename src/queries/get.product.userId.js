const Product = require('../models/products');

function getProductByUserIdQuery(business_id, page) {
    return Product.find({ business_id }, null, { sort: { _id: -1 }, skip: page, limit: 20 });
}

module.exports = getProductByUserIdQuery