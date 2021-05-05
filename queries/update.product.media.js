const Product = require('../models/products');
const PreProduct = require('../models/preProduct');
const utils = require('../src/utils');

async function updateProductMediaQuery(_id, media, mediaIndex, type, lastFile, user_id) {
    const preProduct = await PreProduct.findOne({_id})
    preProduct.medias = [...preProduct.medias, [ mediaIndex, type, media ]]
    if (lastFile === 'false') {
        console.log('preeeee')
        return PreProduct.updateOne({_id}, preProduct)
    } else {
        const product = {
            name: preProduct.name,
            price: preProduct.price,
            description: preProduct.description,
            cat1: preProduct.cat1,
            cat2: preProduct.cat2,
            cat3: preProduct.cat3,
            cat4: preProduct.cat4,
            medias: preProduct.medias
        };
        product.tags = utils.createTag(preProduct);
        
        const newProduct = new Product({ ...product, created_at: new Date(), user_id, updated_at: new Date() });
        await PreProduct.deleteOne({_id})
        return newProduct.save()
        // console.log(newProduct)
    }
}

module.exports = updateProductMediaQuery;