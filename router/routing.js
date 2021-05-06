const express = require('express');
const {register, login, getUserInfo, getUsersController} = require('../controlers/user.controller');
const apiRouter = express.Router();
const {validate} = require('express-validation');
const { userSchema, loginSchema, getUsersSchema } = require('../middleware/user.validator');
const authenticateJWT = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const { inserCategoryController, getCategoriesController, deleteCategoriesController, putCategoriesController } = require('../controlers/category,controller');
const { categorySchema, getCategorySchema, deleteCategorySchema, putCategorySchema } = require('../middleware/category.validator');

apiRouter.post('/register', validate(userSchema, {}, {}), register);
apiRouter.post('/registermember', authenticateJWT, authorization, validate(userSchema, {}, {}), register);
apiRouter.post('/login', validate(loginSchema, {}, {}), login);
apiRouter.get('/getuserinfo', authenticateJWT, getUserInfo);
apiRouter.get('/getusers', authenticateJWT, authorization, validate(getUsersSchema, {}, {}), getUsersController);

apiRouter.post('/category', authenticateJWT, authorization, validate(categorySchema, {}, {}), inserCategoryController);
apiRouter.get('/category', authenticateJWT, authorization, validate(getCategorySchema, {}, {}), getCategoriesController );
apiRouter.delete('/category', authenticateJWT, authorization, validate(deleteCategorySchema, {}, {}), deleteCategoriesController );
apiRouter.put('/category', authenticateJWT, authorization, validate(putCategorySchema, {}, {}), putCategoriesController );

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
