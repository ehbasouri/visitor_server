const PreProduct = require('../models/preProduct');

function insertProductQuery(data) {
    const newProduct = new PreProduct({ ...data, created_at: new Date(), updated_at: new Date() });
    return newProduct.save()
}

module.exports = insertProductQuery