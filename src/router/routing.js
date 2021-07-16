const express = require('express');
const apiRouter = express.Router();
const {validate} = require('express-validation');

//autt
const authenticateJWT = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

//controllers
//user
const {
    register, 
    login, 
    getUserInfo, 
    updateUserInfo,
    getUsersController} = require('../controlers/user.controller');
//business
const {
    registerBusinessController,
    loginBusinessController,
    getBusinessInfoController,
    getBusinessController,
    updateBusinessInfoController} = require('../controlers/business.controller');
//category
const { 
    inserCategoryController,
    getCategoriesController,
    getBusinessCategoriesController,
    deleteCategoriesController,
    putCategoriesController,
    putAllCategoryController } = require('../controlers/category,controller');
//store
const { 
    inserStoreController,
    getStoreController,
    deleteStoreController,
    putStoreController } = require('../controlers/store.controller');
//cbr
const { 
    inserCbrController,
    getCbrController,
    deleteCbrController,
    putCbrController } = require('../controlers/cbr.controller');
//cbr
const { 
    inserFcmTokenController,
    getFcmTokenController,
    deleteFcmTokenController } = require('../controlers/fcmToken.controller');

//product
const { 
    inserProductController,
    getProductController,
    deleteProductController,
    getBusinessProductController,
    putProductController,
    // putAllController,
    updateProductsInStore } = require('../controlers/product.controller');
//order
const { 
    inserOrderController,
    getOrderController,
    putOrderController } = require('../controlers/order.controller');
//package
const { 
    insertPackageController,
    getPackageController,
    deletPackageController,
    putPackageController } = require('../controlers/package.controller');

//analytics
const { 
    registerAndUpdateAnalytics,
    getAnalyticsController } = require('../controlers/analytics.controller');

    

//validators
//user
const { 
    userSchema, 
    loginSchema, 
    putUserSchema,
    getUsersSchema } = require('../middleware/user.validator');
//business
const { 
    businessSchema, 
    businessLoginSchema, 
    putBusinessSchema,
    getBusinesssSchema } = require('../middleware/business.validator');
//category
const { 
    categorySchema,
    getCategorySchema,
    getBusinessCategorySchema,
    deleteCategorySchema,
    putCategorySchema } = require('../middleware/category.validator');
//store
const { 
    storeSchema,
    getStoreSchema,
    deleteStoreSchema,
    putStoreSchema } = require('../middleware/store.validator');
//cbr
const { 
    cbrSchema,
    getCbrSchema,
    deleteCbrSchema,
    putCbrSchema } = require('../middleware/cbr.validator');
//fcm
const { 
    fcmTokenSchema,
    getFcmTokenSchema,
    deleteFcmTokenSchema } = require('../middleware/fcmToken.validator');

//product
const { 
    productSchema,
    getProductSchema,
    deleteProductSchema,
    putProductSchema, 
    getBusinessProductSchema} = require('../middleware/product.validatore');

//order
const { 
    orderSchema,
    getClientOrderSchema,
    getBusinessOrderSchema,
    putOrderSchema} = require('../middleware/order.validator');

//order
const { 
    packageSchema,
    getClientPackageSchema,
    getBusinessPackageSchema,
    deletePackageSchema,
    putPackageSchema} = require('../middleware/package.validator');

//analytics
const { 
    getAnalyticsSchema} = require('../middleware/analytics.validator');
    
const { insertOrderNotification } = require('../notification/orderNotifications');

//user
apiRouter.post('/register', validate(userSchema, {}, {}), register);
apiRouter.post('/login', validate(loginSchema, {}, {}), login);
apiRouter.get('/getuserinfo', authenticateJWT, getUserInfo);
apiRouter.put('/user', authenticateJWT, validate(putUserSchema, {}, {}), updateUserInfo, getUserInfo);
apiRouter.get('/business/getusers', authenticateJWT, authorization, validate(getUsersSchema, {}, {}), getUsersController);

//business
apiRouter.post('/business/register', validate(businessSchema, {}, {}), registerBusinessController);
apiRouter.post('/business/login', validate(businessLoginSchema, {}, {}), loginBusinessController);
apiRouter.get('/business/getinfo', authenticateJWT, getBusinessInfoController);
apiRouter.get('/business', authenticateJWT, validate(getBusinesssSchema, {}, {}), getBusinessController);
apiRouter.put('/business', authenticateJWT, validate(putBusinessSchema, {}, {}), updateBusinessInfoController, getBusinessInfoController);

//category
apiRouter.post('/business/category', authenticateJWT, authorization, validate(categorySchema, {}, {}), inserCategoryController);
apiRouter.get('/category', authenticateJWT, validate(getCategorySchema, {}, {}), getCategoriesController );
apiRouter.get('/business/category', authenticateJWT, authorization, validate(getBusinessCategorySchema, {}, {}), getBusinessCategoriesController );
apiRouter.delete('/business/category', authenticateJWT, authorization, validate(deleteCategorySchema, {}, {}), deleteCategoriesController );
apiRouter.put('/business/category', authenticateJWT, authorization, validate(putCategorySchema, {}, {}), putCategoriesController );

//store
apiRouter.post('/business/store', authenticateJWT, authorization, validate(storeSchema, {}, {}), inserStoreController);
apiRouter.get('/business/store', authenticateJWT, authorization, validate(getStoreSchema, {}, {}), getStoreController );
apiRouter.delete('/business/store', authenticateJWT, authorization, validate(deleteStoreSchema, {}, {}), deleteStoreController );
apiRouter.put('/business/store', authenticateJWT, authorization, validate(putStoreSchema, {}, {}), putStoreController );

//product
apiRouter.post('/business/product', authenticateJWT, authorization, validate(productSchema, {}, {}), inserProductController);
apiRouter.get('/product', authenticateJWT, validate(getProductSchema, {}, {}), getProductController );
apiRouter.get('/business/product', authenticateJWT, authorization, validate(getBusinessProductSchema, {}, {}), getBusinessProductController );
apiRouter.delete('/business/product', authenticateJWT, authorization, validate(deleteProductSchema, {}, {}), deleteProductController );
apiRouter.put('/business/product', authenticateJWT, authorization, validate(putProductSchema, {}, {}), putProductController );
// apiRouter.put('/put/product', putAllController );

//order
apiRouter.post('/order', authenticateJWT, validate(orderSchema, {}, {}), registerAndUpdateAnalytics, updateProductsInStore, insertOrderNotification, inserOrderController);
apiRouter.get('/client/order', authenticateJWT, validate(getClientOrderSchema, {}, {}), getOrderController );
apiRouter.get('/business/order', authenticateJWT, authorization, validate(getBusinessOrderSchema, {}, {}), getOrderController );
apiRouter.put('/order', authenticateJWT, validate(putOrderSchema, {}, {}), registerAndUpdateAnalytics, updateProductsInStore , putOrderController );

//package
apiRouter.post('/package', authenticateJWT, authorization, validate(packageSchema, {}, {}), insertPackageController);
apiRouter.get('/client/package', authenticateJWT, validate(getClientPackageSchema, {}, {}), getPackageController );
apiRouter.get('/business/package', authenticateJWT, authorization, validate(getBusinessPackageSchema, {}, {}), getPackageController );
apiRouter.put('/package', authenticateJWT, authorization, validate(putPackageSchema, {}, {}) , putPackageController );
apiRouter.delete('/package', authenticateJWT, authorization, validate(deletePackageSchema, {}, {}) , deletPackageController );

//analytics
apiRouter.get('/analytics', authenticateJWT, validate(getAnalyticsSchema, {}, {}), getAnalyticsController );

//cbr
apiRouter.post('/business/cbr', authenticateJWT, authorization, validate(cbrSchema, {}, {}), inserCbrController);
apiRouter.get('/cbr', authenticateJWT, validate(getCbrSchema, {}, {}), getCbrController );
apiRouter.delete('/business/cbr', authenticateJWT, authorization, validate(deleteCbrSchema, {}, {}), deleteCbrController );
apiRouter.put('/business/cbr', authenticateJWT, authorization, validate(putCbrSchema, {}, {}), putCbrController );

//fcm
apiRouter.post('/fcm', authenticateJWT, validate(fcmTokenSchema, {}, {}), inserFcmTokenController);
apiRouter.get('/fcm', authenticateJWT, getFcmTokenController );
apiRouter.delete('/fcm', authenticateJWT, validate(deleteFcmTokenSchema, {}, {}), deleteFcmTokenController );


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
