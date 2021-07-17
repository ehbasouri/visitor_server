const queries = require("../queries/query")
const Product = require("../models/products");
const Order = require("../models/order");

const productQueries = Object.create(queries);
productQueries.Model = Product;

async function inserProductController(req, res, next) {
    try {
        const product = await productQueries.insertQuery({...req.body, business_id : req.user._id});
        return res.status(200).json(product)
    } catch (error) {
        next(error)
    }    
}

async function getProductController(req, res, next) {
    try {
        const text = req.query.name
        delete req.query.name
        const product = await productQueries.getQuery(req.query, req.query.page, req.query.limit, text);
        return res.status(200).json(product)
    } catch (error) {
        next(error);
    }
}

async function getBusinessProductController(req, res, next) {
    try {
        const text = req.query.name
        delete req.query.name
        const product = await productQueries.getQuery({ business_id: req.user._id, ...req.query}, req.query.page, req.query.limit, text);
        return res.status(200).json(product)
    } catch (error) {
        next(error);
    }
}

async function deleteProductController(req, res, next) {
    try {
        const result = await productQueries.deleteQuery({_id: req.query.id, business_id: req.user._id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function putProductController(req, res, next) {
    try {
        const result = await productQueries.putQuery(req.query.id, { ...req.body, business_id: req.user._id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

const mergeList = (arr1 = [], arr2 = []) => {
    const a1 = JSON.parse(JSON.stringify(arr1))
    const a2 = JSON.parse(JSON.stringify(arr2))
    const result = [...a2];
    a1.map(item=>{
        const index = a2.findIndex(item2=>item._id === item2._id)
        if (index > -1) {
            result[index].countInBasket = result[index].countInBasket + item.countInBasket
            result[index].unitCountInBasket = result[index].unitCountInBasket + item.unitCountInBasket
        } else {
            result.push(item)
        }
    })
    return result
}

async function updateProductsInStore(req, res, next) { 
    if(req.body.status !== "archive" ){
        next()
    }else{
        const products = mergeList(req.body.products, req.body.gift);
        try {
            products.forEach(async product => {
                const data = {
                    count: 0
                }
                const current_product = await productQueries.getQuery({_id: product._id});
                if(current_product && current_product[0]){
                        data.count = current_product[0].count
                    if(product.countInBasket > 0){
                        data.count = current_product[0].count - product.countInBasket;
                    }
                    
                    if( product.unitCountInBasket > 0 ){
                        const count_to_decrease = current_product[0].count_to_decrease +  product.unitCountInBasket;
                        data.count = data.count - (Math.floor(count_to_decrease / product.count_in_box));
                        data.count_to_decrease = count_to_decrease % product.count_in_box
                    }
                }

                await productQueries.putQuery(product._id, data);
            });
            next()
        } catch (error) {
            next(error);
        }
    }
}

async function backProductsToStore(req, res, next) { 
    if(req.body.status !== "active" ){
        next()
    }else{
        const products = mergeList(req.body.products, req.body.gift);
        try {
            products.forEach(async product => {
                const data = {
                    count: 0
                }
                const current_product = await productQueries.getQuery({_id: product._id});
                if(current_product && current_product[0]){
                        data.count = current_product[0].count
                    if(product.countInBasket > 0){
                        data.count = data.count + product.countInBasket;
                    }
                    if( product.unitCountInBasket > 0 ){
                        const count_to_decrease = current_product[0].count_to_decrease 

                        data.count = data.count + (Math.floor(product.unitCountInBasket / current_product[0].count_in_box));
                        if(count_to_decrease < (product.unitCountInBasket % product.count_in_box)){
                            data.count_to_decrease = (count_to_decrease + product.count_in_box ) - (product.unitCountInBasket % product.count_in_box)
                            data.count = data.count + 1;
                        }else {
                            data.count_to_decrease = count_to_decrease - (product.unitCountInBasket % product.count_in_box)
                        }
                    }
                }
                await productQueries.putQuery(product._id, data);
            });
            next()
        } catch (error) {
            next(error);
        }
    }
}


// async function putAllController(req, res, next) {
//     try {
//         const order = await productQueries.getQuery({});
//         order.map( async (item)=>{
//             const data = {
//                 count_in_box: 10,
//                 count_to_decrease: 0,
//                 unit_price:  Math.floor(item.price / 10)
//             }
//             const result = await productQueries.putQuery(item._id, data);
//         })
//         return res.status(200).json({result: "ok"})
//     } catch (error) {
//         next(error);
//     }
// } 

module.exports = {
    inserProductController,
    getProductController,
    deleteProductController,
    putProductController,
    getBusinessProductController,
    updateProductsInStore,
    backProductsToStore
    // putAllController
}

