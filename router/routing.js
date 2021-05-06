const express = require('express');
const apiRouter = express.Router();
const {validate} = require('express-validation');

//autt
const authenticateJWT = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

//controller
const {
    register, 
    login, 
    getUserInfo, 
    getUsersController} = require('../controlers/user.controller');
const { 
    inserCategoryController,
    getCategoriesController,
    deleteCategoriesController,
    putCategoriesController } = require('../controlers/category,controller');
const { 
    inserStoreController,
    getStoreController,
    deleteStoreController,
    putStoreController } = require('../controlers/store.controller');
const { 
    inserProductController,
    getProductController,
    deleteProductController,
    putProductController } = require('../controlers/product.controller');

//validator
const { 
    userSchema, 
    loginSchema, 
    getUsersSchema } = require('../middleware/user.validator');
const { 
    categorySchema,
    getCategorySchema,
    deleteCategorySchema,
    putCategorySchema } = require('../middleware/category.validator');
const { 
    storeSchema,
    getStoreSchema,
    deleteStoreSchema,
    putStoreSchema } = require('../middleware/store.validator');
const { 
    productSchema,
    getProductSchema,
    deleteProductSchema,
    putProductSchema } = require('../middleware/product.validatore');

//user
apiRouter.post('/register', validate(userSchema, {}, {}), register);
apiRouter.post('/registermember', authenticateJWT, authorization, validate(userSchema, {}, {}), register);
apiRouter.post('/login', validate(loginSchema, {}, {}), login);
apiRouter.get('/getuserinfo', authenticateJWT, getUserInfo);
apiRouter.get('/getusers', authenticateJWT, authorization, validate(getUsersSchema, {}, {}), getUsersController);

//category
apiRouter.post('/category', authenticateJWT, authorization, validate(categorySchema, {}, {}), inserCategoryController);
apiRouter.get('/category', authenticateJWT, authorization, validate(getCategorySchema, {}, {}), getCategoriesController );
apiRouter.delete('/category', authenticateJWT, authorization, validate(deleteCategorySchema, {}, {}), deleteCategoriesController );
apiRouter.put('/category', authenticateJWT, authorization, validate(putCategorySchema, {}, {}), putCategoriesController );

//store
apiRouter.post('/store', authenticateJWT, authorization, validate(storeSchema, {}, {}), inserStoreController);
apiRouter.get('/store', authenticateJWT, authorization, validate(getStoreSchema, {}, {}), getStoreController );
apiRouter.delete('/store', authenticateJWT, authorization, validate(deleteStoreSchema, {}, {}), deleteStoreController );
apiRouter.put('/store', authenticateJWT, authorization, validate(putStoreSchema, {}, {}), putStoreController );

//product
apiRouter.post('/product', authenticateJWT, authorization, validate(productSchema, {}, {}), inserProductController);
apiRouter.get('/product', authenticateJWT, authorization, validate(getProductSchema, {}, {}), getProductController );
apiRouter.delete('/product', authenticateJWT, authorization, validate(deleteProductSchema, {}, {}), deleteProductController );
apiRouter.put('/product', authenticateJWT, authorization, validate(putProductSchema, {}, {}), putProductController );

// apiRouter.delete('/product/:id', Controller.deleteProduct);
// apiRouter.put('/product/:id', validateRequest.checkProduct, validateRequest.productValidator, Controller.updateProduct);
// apiRouter.get('/product/:id', Controller.getProductById);
// apiRouter.get('/userproducts/:page', Controller.getProductByUserId);
// apiRouter.get('/category/:parId', Controller.getCategoryByparId);
// apiRouter.get('/category', Controller.getCategoryByparId);
// apiRouter.post('/productToPost', validate(validateRequest.productToPostValidator), Controller.productToPost);
// apiRouter.post('/product/image/:imageName/:product/:fromBytes/:mediaIndex/:lastFile/:width/:height', Controller.uploadProductImage);
// apiRouter.post('/product/video/:videoName/:product/:fromBytes/:mediaIndex/:lastFile/:width/:height', Controller.uploadProductVideo);

module.exports = apiRouter;
