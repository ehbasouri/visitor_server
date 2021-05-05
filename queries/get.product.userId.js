const Product = require('../models/products');

function getProductByUserIdQuery(user_id, page) {
    return Product.find({ user_id }, null, { sort: { _id: -1 }, skip: page, limit: 20 });
}

module.exports = getProductByUserIdQuery